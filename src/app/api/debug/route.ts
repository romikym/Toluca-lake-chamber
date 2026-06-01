import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Temporary diagnostic endpoint — surfaces the exact DB error so we can debug the
// Netlify deploy. Returns HTTP 200 either way so the body is always readable.
export async function GET() {
  const info: Record<string, unknown> = {
    hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
    hasDirectUrl: Boolean(process.env.DIRECT_URL),
    node: process.version,
    platform: process.platform,
  };
  try {
    const businesses = await db.business.count();
    return NextResponse.json({ ok: true, businesses, ...info });
  } catch (e: unknown) {
    const err = e as { message?: string; stack?: string; name?: string };
    return NextResponse.json({
      ok: false,
      errorName: err?.name ?? null,
      error: err?.message ?? String(e),
      stack: (err?.stack ?? "").split("\n").slice(0, 6),
      ...info,
    });
  }
}
