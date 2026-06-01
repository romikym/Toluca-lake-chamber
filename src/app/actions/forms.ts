"use server";

import { headers } from "next/headers";
import { db } from "@/lib/db";
import { sendEmail, templates } from "@/lib/email";
import { notifyAdmins } from "@/server/notifications";
import { rateLimit, clientIp, LIMITS } from "@/lib/rate-limit";
import { plans } from "@/lib/data";
import { site } from "@/lib/site";

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

async function checkLimit(): Promise<{ ok: boolean; error?: string }> {
  const ip = clientIp(await headers());
  const r = rateLimit(`form:${ip}`, LIMITS.form.limit, LIMITS.form.windowMs);
  return r.ok ? { ok: true } : { ok: false, error: "You're submitting too quickly. Please wait a moment and try again." };
}

export async function subscribeNewsletter(email: string): Promise<{ ok: boolean; error?: string }> {
  const lim = await checkLimit();
  if (!lim.ok) return lim;
  const value = email.trim().toLowerCase();
  if (!isEmail(value)) return { ok: false, error: "Please enter a valid email." };
  try {
    await db.newsletterSubscriber.upsert({
      where: { email: value },
      update: {},
      create: { email: value, source: "website", status: "PENDING" },
    });
    const t = templates.welcomeSubscriber();
    await sendEmail({ to: value, subject: t.subject, html: t.html });
    return { ok: true };
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

export async function submitContact(input: {
  firstName?: string; lastName?: string; email: string; phone?: string;
  interest?: string; message: string;
}): Promise<{ ok: boolean; error?: string }> {
  const lim = await checkLimit();
  if (!lim.ok) return lim;
  if (!isEmail(input.email)) return { ok: false, error: "Please enter a valid email." };
  if (!input.message.trim()) return { ok: false, error: "Please enter a message." };
  try {
    await db.contactSubmission.create({
      data: {
        firstName: input.firstName || null,
        lastName: input.lastName || null,
        email: input.email.trim().toLowerCase(),
        phone: input.phone || null,
        interest: input.interest || null,
        message: input.message.trim(),
      },
    });
    const ack = templates.contactAck(input.firstName);
    const adminMsg = templates.contactAdmin(input);
    await Promise.all([
      sendEmail({ to: input.email, subject: ack.subject, html: ack.html }),
      sendEmail({ to: site.email, subject: adminMsg.subject, html: adminMsg.html, replyTo: input.email }),
    ]);
    await notifyAdmins(
      "contact",
      `New message — ${input.interest ?? "General"}`,
      `${[input.firstName, input.lastName].filter(Boolean).join(" ") || input.email}: ${input.message.slice(0, 80)}`,
      "/admin/content"
    );
    return { ok: true };
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

export async function submitJoinLead(input: {
  name: string; email: string; phone?: string; business?: string; planKey: string;
}): Promise<{ ok: boolean; error?: string }> {
  const lim = await checkLimit();
  if (!lim.ok) return lim;
  if (!isEmail(input.email)) return { ok: false, error: "Please enter a valid email." };
  try {
    await db.contactSubmission.create({
      data: {
        firstName: input.name || null,
        email: input.email.trim().toLowerCase(),
        phone: input.phone || null,
        interest: `Membership application: ${input.planKey}`,
        message: `New membership application.\nPlan: ${input.planKey}\nBusiness: ${input.business || "—"}\nApplicant: ${input.name}`,
      },
    });
    const plan = plans.find((p) => p.key === input.planKey);
    const label = plan ? `${plan.name}${plan.eligibility ? ` — ${plan.eligibility}` : ""}` : input.planKey;
    const t = templates.membershipApplication(input.name, label);
    await sendEmail({ to: input.email, subject: t.subject, html: t.html });
    await notifyAdmins("application", "New membership application", `${input.name} — ${label}`, "/admin/members");
    return { ok: true };
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
