"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Users } from "lucide-react";
import { startEventCheckout } from "@/app/actions/payments";
import { formatCurrency } from "@/lib/utils";

export function RegistrationPanel({
  slug,
  price,
  capacity,
  registered,
}: {
  slug: string;
  price: number;
  capacity: number;
  registered: number;
}) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const pct = Math.min(100, Math.round((registered / capacity) * 100));
  const spotsLeft = Math.max(0, capacity - registered);

  async function register() {
    setState("loading");
    setError(null);
    const res = await startEventCheckout({ slug });
    if (res.url) {
      window.location.href = res.url; // paid event → Stripe Checkout
      return;
    }
    if (res.error) {
      setError(res.error);
      setState("idle");
      return;
    }
    setState("done"); // free RSVP or simulated paid registration (recorded in DB)
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
      <div className="flex items-baseline justify-between">
        <span className="font-display text-2xl font-bold text-brand-900">
          {price === 0 ? "Free" : formatCurrency(price)}
        </span>
        <span className="text-sm text-muted">{price === 0 ? "RSVP required" : "per ticket"}</span>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-muted">
          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {registered} registered</span>
          <span>{spotsLeft} spots left</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-brand-100">
          <motion.div
            className="h-full rounded-full bg-brand-500"
            initial={{ width: 0 }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {state === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-3 text-sm font-medium text-brand-700"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white">
              <Check className="h-3.5 w-3.5" />
            </span>
            You&apos;re registered! Check your email for details.
          </motion.div>
        ) : (
          <motion.button
            key="btn"
            onClick={register}
            disabled={state === "loading" || spotsLeft === 0}
            className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-500 font-medium text-white transition hover:bg-brand-600 disabled:opacity-60"
          >
            {state === "loading" ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : spotsLeft === 0 ? (
              "Join the waitlist"
            ) : price === 0 ? (
              "RSVP now"
            ) : (
              "Register"
            )}
          </motion.button>
        )}
      </AnimatePresence>
      {error && <p className="mt-3 text-center text-sm text-danger">{error}</p>}
      <p className="mt-3 text-center text-xs text-muted">Secure registration · Stripe-powered checkout</p>
    </div>
  );
}
