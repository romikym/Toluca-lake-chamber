/**
 * Lightweight in-memory fixed-window rate limiter.
 *
 * Works out of the box for a single instance (dev + small deployments). For
 * multi-instance production, swap the store for Upstash Redis (see
 * docs/CONNECTIONS.md) — the `rateLimit` signature stays the same.
 */

type Bucket = { count: number; reset: number };
const store = new Map<string, Bucket>();

// Occasionally prune expired buckets to bound memory.
let lastSweep = 0;
function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [k, b] of store) if (b.reset <= now) store.delete(k);
}

export type RateResult = { ok: boolean; remaining: number; retryAfterSec: number };

export function rateLimit(id: string, limit: number, windowMs: number): RateResult {
  const now = Date.now();
  sweep(now);
  const existing = store.get(id);

  if (!existing || existing.reset <= now) {
    store.set(id, { count: 1, reset: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfterSec: Math.ceil(windowMs / 1000) };
  }

  if (existing.count >= limit) {
    return { ok: false, remaining: 0, retryAfterSec: Math.max(1, Math.ceil((existing.reset - now) / 1000)) };
  }

  existing.count += 1;
  return { ok: true, remaining: limit - existing.count, retryAfterSec: Math.ceil((existing.reset - now) / 1000) };
}

/** Extract a best-effort client IP from request headers. */
export function clientIp(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "local";
}

/** Convenience presets (requests per window). */
export const LIMITS = {
  form: { limit: 5, windowMs: 60_000 },      // 5 form submits / min / IP
  ai: { limit: 20, windowMs: 60_000 },       // 20 AI calls / min / IP
  payment: { limit: 10, windowMs: 60_000 },  // 10 checkout attempts / min / IP
} as const;
