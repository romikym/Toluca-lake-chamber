"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, RefreshCw, CheckCircle2 } from "lucide-react";
import { plans } from "@/lib/data";
import { startRenewalCheckout } from "@/app/actions/payments";
import { formatCurrency, cn } from "@/lib/utils";

export function RenewPanel({ initialPlan }: { initialPlan?: string }) {
  const [planKey, setPlanKey] = useState(initialPlan ?? plans[1].key);
  const [form, setForm] = useState({ business: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plan = plans.find((p) => p.key === planKey) ?? plans[1];

  async function submit() {
    if (!form.email) {
      setError("Please enter the email on your membership.");
      return;
    }
    setSubmitting(true);
    setError(null);
    const res = await startRenewalCheckout({ planKey: plan.key, email: form.email, business: form.business });
    if (res.url) {
      window.location.href = res.url;
      return;
    }
    if (res.error) {
      setError(res.error);
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
    setDone(true);
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-line bg-surface p-10 text-center shadow-sm"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h2 className="mt-5 font-display text-2xl font-bold text-brand-900">Renewal received</h2>
        <p className="mx-auto mt-3 max-w-sm text-ink-soft">
          Thank you for staying with the Village. We&apos;ve recorded your {plan.name} renewal and emailed a confirmation to{" "}
          <span className="font-semibold text-brand-700">{form.email}</span>.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5be2a1] to-[#00a76d] text-white shadow-emerald-soft">
          <RefreshCw className="h-5 w-5" strokeWidth={2} />
        </span>
        <div>
          <h2 className="font-display text-xl font-semibold text-brand-900">Renew your membership</h2>
          <p className="text-sm text-muted">Pick up right where you left off.</p>
        </div>
      </div>

      {/* Plan selector */}
      <label className="mt-7 block text-sm font-semibold text-ink-soft">Your membership level</label>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {plans.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => setPlanKey(p.key)}
            className={cn(
              "flex items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition-all active:scale-[0.99]",
              planKey === p.key
                ? "border-brand-400 bg-brand-50 ring-2 ring-brand-200"
                : "border-line hover:border-brand-300"
            )}
          >
            <span>
              <span className="block text-sm font-semibold text-brand-900">{p.name}</span>
              {p.eligibility && <span className="block text-xs text-muted">{p.eligibility}</span>}
            </span>
            <span className="flex items-center gap-2">
              <span className="font-display text-base font-bold text-brand-700">
                {formatCurrency(p.priceCents)}<span className="text-xs font-medium text-muted">/yr</span>
              </span>
              {planKey === p.key && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
              )}
            </span>
          </button>
        ))}
      </div>

      {/* Details */}
      <div className="mt-6 grid gap-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-soft">Business / organization</span>
          <input
            value={form.business}
            onChange={(e) => setForm((f) => ({ ...f, business: e.target.value }))}
            placeholder="Your business name"
            className="h-12 w-full rounded-xl border border-line bg-canvas px-4 text-sm outline-none focus:border-brand-500"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-soft">Membership email</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="you@business.com"
            className="h-12 w-full rounded-xl border border-line bg-canvas px-4 text-sm outline-none focus:border-brand-500"
          />
        </label>
      </div>

      {error && <p className="mt-3 text-sm text-danger">{error}</p>}

      <button
        onClick={submit}
        disabled={submitting}
        className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2a7fb8] font-medium text-white transition hover:bg-[#236d9f] disabled:opacity-60"
      >
        {submitting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>Renew for {formatCurrency(plan.priceCents)}/yr</>
        )}
      </button>
      <p className="mt-3 text-center text-xs text-muted">Secure renewal · Stripe-powered · Cancel anytime</p>
    </div>
  );
}
