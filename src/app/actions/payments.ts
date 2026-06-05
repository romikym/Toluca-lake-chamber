"use server";

import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { plans } from "@/lib/data";
import { products } from "@/lib/store";
import { notifyAdmins } from "@/server/notifications";
import { rateLimit, clientIp, LIMITS } from "@/lib/rate-limit";
import { formatCurrency } from "@/lib/utils";

type CheckoutResult = { url?: string; simulated?: boolean; free?: boolean; error?: string };

async function baseUrl() {
  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const proto = host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https";
  return `${proto}://${host}`;
}

async function checkPayLimit(): Promise<CheckoutResult | null> {
  const ip = clientIp(await headers());
  const r = rateLimit(`pay:${ip}`, LIMITS.payment.limit, LIMITS.payment.windowMs);
  return r.ok ? null : { error: "Too many attempts — please wait a moment and try again." };
}

export async function startMembershipCheckout(input: {
  planKey: string; name: string; email: string; business?: string;
}): Promise<CheckoutResult> {
  const limited = await checkPayLimit();
  if (limited) return limited;
  const plan = plans.find((p) => p.key === input.planKey);
  if (!plan) return { error: "Unknown plan." };

  if (stripe) {
    const origin = await baseUrl();
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: input.email || undefined,
      line_items: [{
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: plan.priceCents,
          recurring: { interval: "year" },
          product_data: { name: `${plan.name} Membership${plan.eligibility ? ` (${plan.eligibility})` : ""}` },
        },
      }],
      metadata: { kind: "membership", planKey: plan.key, email: input.email, business: input.business ?? "" },
      success_url: `${origin}/portal?welcome=1`,
      cancel_url: `${origin}/membership/apply?canceled=1`,
    });
    await db.payment.create({
      data: { kind: "membership", amountCents: plan.priceCents, email: input.email, refSlug: plan.key, status: "PENDING", stripeSessionId: session.id },
    });
    return { url: session.url ?? undefined };
  }

  // Keyless fallback: record a simulated payment so the flow persists.
  await db.payment.create({
    data: { kind: "membership", amountCents: plan.priceCents, email: input.email, refSlug: plan.key, status: "SIMULATED" },
  });
  return { simulated: true };
}

export async function startRenewalCheckout(input: {
  planKey: string; email: string; business?: string;
}): Promise<CheckoutResult> {
  const limited = await checkPayLimit();
  if (limited) return limited;
  const plan = plans.find((p) => p.key === input.planKey);
  if (!plan) return { error: "Unknown plan." };

  if (stripe) {
    const origin = await baseUrl();
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: input.email || undefined,
      line_items: [{
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: plan.priceCents,
          recurring: { interval: "year" },
          product_data: { name: `${plan.name} Membership Renewal${plan.eligibility ? ` (${plan.eligibility})` : ""}` },
        },
      }],
      metadata: { kind: "renewal", planKey: plan.key, email: input.email, business: input.business ?? "" },
      success_url: `${origin}/portal?renewed=1`,
      cancel_url: `${origin}/membership/renew?canceled=1`,
    });
    await db.payment.create({
      data: { kind: "membership", amountCents: plan.priceCents, email: input.email, refSlug: plan.key, status: "PENDING", stripeSessionId: session.id },
    });
    return { url: session.url ?? undefined };
  }

  // Keyless fallback: record a simulated renewal so the flow persists.
  await db.payment.create({
    data: { kind: "membership", amountCents: plan.priceCents, email: input.email, refSlug: plan.key, status: "SIMULATED" },
  });
  return { simulated: true };
}

export async function startEventCheckout(input: {
  slug: string; name?: string; email?: string;
}): Promise<CheckoutResult> {
  const limited = await checkPayLimit();
  if (limited) return limited;
  const e = await db.event.findUnique({ where: { slug: input.slug } });
  if (!e) return { error: "Event not found." };

  // Free events: confirm RSVP immediately.
  if (e.priceCents === 0) {
    await db.eventRegistration.create({ data: { eventSlug: e.slug, guestName: input.name ?? null, guestEmail: input.email ?? null, status: "CONFIRMED" } });
    await db.event.update({ where: { slug: e.slug }, data: { registered: { increment: 1 } } });
    return { simulated: true, free: true };
  }

  if (stripe) {
    const origin = await baseUrl();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: input.email || undefined,
      line_items: [{ quantity: 1, price_data: { currency: "usd", unit_amount: e.priceCents, product_data: { name: e.title } } }],
      metadata: { kind: "event", slug: e.slug, email: input.email ?? "", name: input.name ?? "" },
      success_url: `${origin}/events/${e.slug}?registered=1`,
      cancel_url: `${origin}/events/${e.slug}?canceled=1`,
    });
    await db.payment.create({ data: { kind: "event", amountCents: e.priceCents, email: input.email ?? null, refSlug: e.slug, status: "PENDING", stripeSessionId: session.id } });
    return { url: session.url ?? undefined };
  }

  // Keyless fallback: simulate paid registration.
  await db.eventRegistration.create({ data: { eventSlug: e.slug, guestName: input.name ?? null, guestEmail: input.email ?? null, status: "CONFIRMED" } });
  await db.event.update({ where: { slug: e.slug }, data: { registered: { increment: 1 } } });
  await db.payment.create({ data: { kind: "event", amountCents: e.priceCents, email: input.email ?? null, refSlug: e.slug, status: "SIMULATED" } });
  return { simulated: true };
}

export async function startStoreCheckout(input: {
  items: { slug: string; quantity: number }[]; email?: string;
}): Promise<CheckoutResult> {
  const limited = await checkPayLimit();
  if (limited) return limited;

  // Resolve line items against the trusted server-side catalog (never trust client prices).
  const lines = input.items
    .map((i) => {
      const product = products.find((p) => p.slug === i.slug);
      const quantity = Math.max(1, Math.min(20, Math.floor(i.quantity)));
      return product ? { product, quantity } : null;
    })
    .filter((l): l is { product: (typeof products)[number]; quantity: number } => Boolean(l));

  if (lines.length === 0) return { error: "Your cart is empty." };
  const totalCents = lines.reduce((sum, l) => sum + l.product.priceCents * l.quantity, 0);

  if (stripe) {
    const origin = await baseUrl();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: input.email || undefined,
      shipping_address_collection: { allowed_countries: ["US"] },
      line_items: lines.map((l) => ({
        quantity: l.quantity,
        price_data: {
          currency: "usd",
          unit_amount: l.product.priceCents,
          product_data: { name: l.product.name, description: l.product.tagline },
        },
      })),
      metadata: { kind: "store", items: lines.map((l) => `${l.product.slug}x${l.quantity}`).join(",") },
      success_url: `${origin}/store?status=success`,
      cancel_url: `${origin}/store?status=canceled`,
    });
    await db.payment.create({
      data: { kind: "store", amountCents: totalCents, email: input.email ?? null, status: "PENDING", stripeSessionId: session.id },
    });
    return { url: session.url ?? undefined };
  }

  // Keyless fallback: record a simulated order and notify admins.
  await db.payment.create({
    data: { kind: "store", amountCents: totalCents, email: input.email ?? null, status: "SIMULATED" },
  });
  await notifyAdmins("store", "New store order", `${formatCurrency(totalCents)} — ${lines.length} item(s)`, "/admin");
  return { simulated: true };
}

export async function startDonation(input: {
  amountCents: number; recurring: boolean; donorEmail?: string; donorName?: string;
}): Promise<CheckoutResult> {
  const limited = await checkPayLimit();
  if (limited) return limited;
  if (input.amountCents < 100) return { error: "Minimum donation is $1." };

  if (stripe) {
    const origin = await baseUrl();
    const session = await stripe.checkout.sessions.create({
      mode: input.recurring ? "subscription" : "payment",
      customer_email: input.donorEmail || undefined,
      line_items: [{
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: input.amountCents,
          ...(input.recurring ? { recurring: { interval: "month" as const } } : {}),
          product_data: { name: input.recurring ? "Monthly donation — Toluca Lake Chamber" : "Donation — Toluca Lake Chamber" },
        },
      }],
      metadata: { kind: "donation", recurring: String(input.recurring) },
      success_url: `${origin}/donate?status=success`,
      cancel_url: `${origin}/donate?status=canceled`,
    });
    await db.donation.create({ data: { amountCents: input.amountCents, recurring: input.recurring, donorEmail: input.donorEmail ?? null, status: "PENDING", stripeSessionId: session.id } });
    return { url: session.url ?? undefined };
  }

  // Keyless fallback.
  await db.donation.create({ data: { amountCents: input.amountCents, recurring: input.recurring, donorEmail: input.donorEmail ?? null, status: "SIMULATED" } });
  await notifyAdmins("donation", "New donation received", `${formatCurrency(input.amountCents)}${input.recurring ? "/mo" : ""}`, "/admin");
  return { simulated: true };
}
