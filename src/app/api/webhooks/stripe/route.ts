import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { sendEmail, templates } from "@/lib/email";
import { notifyAdmins, notifyUserByEmail } from "@/server/notifications";
import { formatCurrency, formatDate } from "@/lib/utils";
import { plans } from "@/lib/data";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    // Not configured — acknowledge so Stripe doesn't retry in non-prod.
    return NextResponse.json({ received: true, configured: false });
  }

  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig ?? "", secret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const s = event.data.object as Stripe.Checkout.Session;
      const kind = s.metadata?.kind;
      const paymentId = typeof s.payment_intent === "string" ? s.payment_intent : null;

      if (s.id) {
        await db.payment.updateMany({ where: { stripeSessionId: s.id }, data: { status: "SUCCEEDED", stripePaymentId: paymentId } });
        await db.donation.updateMany({ where: { stripeSessionId: s.id }, data: { status: "SUCCEEDED" } });
      }

      if (kind === "donation") {
        await notifyAdmins("donation", "New donation received", formatCurrency(s.amount_total ?? 0), "/admin");
        if (s.customer_email) {
          const t = templates.donationReceipt(formatCurrency(s.amount_total ?? 0), s.metadata?.recurring === "true");
          await sendEmail({ to: s.customer_email, subject: t.subject, html: t.html });
        }
      }

      if (kind === "membership") {
        const email = (s.metadata?.email || s.customer_email || "").toLowerCase();
        const planKey = s.metadata?.planKey ?? "";
        const businessSlug = s.metadata?.business || null;
        if (email && planKey) {
          const user = await db.user.upsert({
            where: { email },
            update: {},
            create: { email, role: "MEMBER", businessSlug: businessSlug ?? undefined },
          });
          await db.membership.create({
            data: {
              userId: user.id, planKey, businessSlug: businessSlug ?? undefined,
              status: "ACTIVE", startedAt: new Date(),
              expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), autoRenew: true,
            },
          });
          const plan = plans.find((p) => p.key === planKey);
          const label = plan ? `${plan.name}${plan.eligibility ? ` — ${plan.eligibility}` : ""}` : planKey;
          const t = templates.membershipActive(label);
          await sendEmail({ to: email, subject: t.subject, html: t.html });
          await notifyAdmins("membership", "New member joined", `${email} — ${label}`, "/admin/members");
          await notifyUserByEmail(email, "membership", "Your membership is active", "Welcome to the Toluca Lake Chamber!", "/portal");
        }
      }

      if (kind === "renewal") {
        const email = (s.metadata?.email || s.customer_email || "").toLowerCase();
        const planKey = s.metadata?.planKey ?? "";
        if (email && planKey) {
          const user = await db.user.upsert({
            where: { email }, update: {}, create: { email, role: "MEMBER" },
          });
          const existing = await db.membership.findFirst({ where: { userId: user.id }, orderBy: { createdAt: "desc" } });
          const base = existing?.expiresAt && existing.expiresAt > new Date() ? existing.expiresAt : new Date();
          const expiresAt = new Date(base.getTime() + 365 * 24 * 60 * 60 * 1000);
          if (existing) {
            await db.membership.update({ where: { id: existing.id }, data: { status: "ACTIVE", planKey, expiresAt, autoRenew: true } });
          } else {
            await db.membership.create({ data: { userId: user.id, planKey, status: "ACTIVE", startedAt: new Date(), expiresAt, autoRenew: true } });
          }
          const plan = plans.find((p) => p.key === planKey);
          const label = plan ? `${plan.name}${plan.eligibility ? ` — ${plan.eligibility}` : ""}` : planKey;
          const t = templates.membershipActive(label);
          await sendEmail({ to: email, subject: t.subject, html: t.html });
          await notifyAdmins("membership", "Membership renewed", `${email} — ${label}`, "/admin/members");
        }
      }

      if (kind === "store") {
        await notifyAdmins("store", "New store order", formatCurrency(s.amount_total ?? 0), "/admin");
      }

      if (kind === "event") {
        const slug = s.metadata?.slug ?? "";
        const email = s.metadata?.email || s.customer_email || null;
        const name = s.metadata?.name || null;
        if (slug) {
          await db.eventRegistration.create({ data: { eventSlug: slug, guestEmail: email, guestName: name, status: "CONFIRMED" } });
          await db.event.update({ where: { slug }, data: { registered: { increment: 1 } } });
          if (email) {
            const ev = await db.event.findUnique({ where: { slug } });
            if (ev) {
              const when = formatDate(ev.start, { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" });
              const t = templates.eventConfirmation(ev.title, when);
              await sendEmail({ to: email, subject: t.subject, html: t.html });
            }
          }
        }
      }
    }

    if (event.type === "invoice.payment_failed") {
      const inv = event.data.object as Stripe.Invoice;
      const email = inv.customer_email?.toLowerCase();
      if (email) {
        const user = await db.user.findUnique({ where: { email } });
        if (user) {
          await db.membership.updateMany({ where: { userId: user.id, status: "ACTIVE" }, data: { status: "PAST_DUE" } });
        }
      }
    }
  } catch (err) {
    console.error("Stripe webhook handler error:", err);
    return NextResponse.json({ error: "Handler error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
