import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { site } from "@/lib/site";
import { db } from "@/lib/db";
import { rateLimit, clientIp, LIMITS } from "@/lib/rate-limit";

export const runtime = "nodejs";

async function logAi(feature: string, model: string, status: string, inputChars: number, outputChars: number) {
  try {
    await db.aiLog.create({ data: { feature, model, status, inputChars, outputChars } });
  } catch (e) {
    console.error("AI log error:", e);
  }
}

const SYSTEM = `You are the friendly assistant for the ${site.name}, located in Toluca Lake, California ("the Village").
Help visitors with: joining the Chamber, membership tiers, events, the business directory, and general info about Toluca Lake.

Key facts you can share:
- Founded in ${site.founded}; serves businesses and residents in and around Toluca Lake.
- Membership tiers (annual): Business $150 (1–10 employees), $200 (11–25), $300 (25+); Non-Profit $130; Resident/Non-Merchant $50.
- Membership is annual, renews after 12 months, with optional auto-renew, and is subject to board approval (full refund if not approved).
- 120+ member businesses across 14 industry categories are listed in the directory.
- Signature programs: Community Cleanup, Networking Mixers, Art Fair, Community Howl, Health Fair, Holiday Open House, Pancake Breakfast Fundraiser.
- Contact: ${site.email}, ${site.phone}, ${site.address.line1}, ${site.address.city}, ${site.address.state} ${site.address.zip}.

Be warm, concise, and community-minded. Use at most a couple of short paragraphs. If unsure, point people to the Contact page. Never invent specific event dates or member details you don't have.`;

// Lightweight keyless fallback so the assistant works without configuration.
function fallback(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("join") || m.includes("member") || m.includes("dues") || m.includes("price"))
    return "Joining is easy! Membership is annual: Business $150 (1–10 employees), $200 (11–25), $300 (25+); Non-Profit $130; and Resident/Non-Merchant $50. You can review tiers and apply on our Membership page. Membership is subject to board approval, with a full refund if not approved.";
  if (m.includes("event"))
    return "We host year-round programs — Community Cleanup, Networking Mixers, the Art Fair, Community Howl, Health Fair, Holiday Open House, and our Pancake Breakfast Fundraiser. Visit the Events page for the calendar and to register.";
  if (m.includes("restaurant") || m.includes("business") || m.includes("directory") || m.includes("find"))
    return "Our Business Directory features 120+ local members across 14 categories — from restaurants and retail to health care and professional services. Head to the Directory to search and filter.";
  if (m.includes("contact") || m.includes("phone") || m.includes("email"))
    return `You can reach the Chamber at ${site.email} or ${site.phone}. We're at ${site.address.line1}, ${site.address.city}, ${site.address.state} ${site.address.zip}.`;
  return "Welcome to the Toluca Lake Chamber of Commerce! I can help with membership, events, and finding local businesses in our directory. What would you like to know? (Tip: add an ANTHROPIC_API_KEY to enable full AI answers.)";
}

export async function POST(req: Request) {
  const ip = clientIp(req.headers);
  const limit = rateLimit(`ai:${ip}`, LIMITS.ai.limit, LIMITS.ai.windowMs);
  if (!limit.ok) {
    return NextResponse.json(
      { reply: "You're sending messages a little too fast — please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
    );
  }

  let messages: { role: "user" | "assistant"; content: string }[] = [];
  let feature = "assistant";
  try {
    const body = await req.json();
    messages = body.messages ?? [];
    if (typeof body.feature === "string") feature = body.feature;
  } catch {
    return NextResponse.json({ reply: "Sorry, I couldn't read that request." }, { status: 400 });
  }

  const last = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    const reply = fallback(last);
    await logAi(feature, "fallback", "ok", last.length, reply.length);
    return NextResponse.json({ reply, mode: "fallback" });
  }

  try {
    const client = new Anthropic({ apiKey });
    const resp = await client.messages.create({
      model: process.env.AI_MODEL_DEFAULT ?? "claude-3-5-haiku-latest",
      max_tokens: 600,
      system: SYSTEM,
      messages: messages
        .filter((m) => m.content?.trim())
        .map((m) => ({ role: m.role, content: m.content })),
    });
    const reply = resp.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { text: string }).text)
      .join("\n")
      .trim();
    const out = reply || fallback(last);
    await logAi(feature, resp.model, "ok", last.length, out.length);
    return NextResponse.json({ reply: out, mode: "claude" });
  } catch (err) {
    console.error("AI route error:", err);
    const reply = fallback(last);
    await logAi(feature, "fallback", "error", last.length, reply.length);
    return NextResponse.json({ reply, mode: "fallback-error" });
  }
}
