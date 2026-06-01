"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Loader2, PartyPopper } from "lucide-react";
import { plans } from "@/lib/data";
import { submitJoinLead } from "@/app/actions/forms";
import { startMembershipCheckout } from "@/app/actions/payments";
import { formatCurrency, cn } from "@/lib/utils";

const steps = ["Plan", "Your details", "Review"];

export function JoinForm({ initialPlan }: { initialPlan?: string }) {
  const [step, setStep] = useState(0);
  const [planKey, setPlanKey] = useState(initialPlan ?? plans[1].key);
  const [form, setForm] = useState({ business: "", name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plan = plans.find((p) => p.key === planKey) ?? plans[1];

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit() {
    setSubmitting(true);
    setError(null);
    // Record the application lead for admin follow-up.
    await submitJoinLead({
      name: form.name, email: form.email, phone: form.phone,
      business: form.business, planKey: plan.key,
    });
    // Start membership checkout (redirects to Stripe when configured).
    const res = await startMembershipCheckout({
      planKey: plan.key, name: form.name, email: form.email, business: form.business,
    });
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
    setDone(true); // simulated (no Stripe key) — application + payment recorded
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-line bg-surface p-10 text-center shadow-sm"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-600">
          <PartyPopper className="h-8 w-8" />
        </div>
        <h2 className="mt-5 font-display text-2xl font-bold text-brand-900">Application received!</h2>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">
          Thank you for applying to the Toluca Lake Chamber of Commerce. Your membership is
          pending board review — you&apos;ll hear from us shortly. (No payment was taken in this demo.)
        </p>
      </motion.div>
    );
  }

  return (
    <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm sm:p-8">
      {/* Stepper */}
      <div className="mb-8 flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors", i <= step ? "bg-brand-500 text-white" : "bg-brand-50 text-muted")}>
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={cn("hidden text-sm font-medium sm:block", i <= step ? "text-brand-800" : "text-muted")}>{s}</span>
            {i < steps.length - 1 && <div className="h-0.5 flex-1 rounded bg-brand-100"><div className={cn("h-full rounded bg-brand-500 transition-all", i < step ? "w-full" : "w-0")} /></div>}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {step === 0 && (
            <div className="space-y-3">
              {plans.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPlanKey(p.key)}
                  className={cn("flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all", planKey === p.key ? "border-brand-400 bg-brand-50 ring-2 ring-brand-200" : "border-line hover:border-brand-300")}
                >
                  <div>
                    <div className="font-display font-semibold text-brand-900">{p.name} {p.eligibility && <span className="text-sm font-normal text-muted">· {p.eligibility}</span>}</div>
                    <div className="text-xs text-muted">{p.audience}</div>
                  </div>
                  <div className="font-display text-lg font-bold text-brand-700">{formatCurrency(p.priceCents)}<span className="text-xs font-normal text-muted">/yr</span></div>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Business / organization" full value={form.business} onChange={(v) => set("business", v)} placeholder="Acme Co. (leave blank if resident)" />
              <Field label="Full name" value={form.name} onChange={(v) => set("name", v)} placeholder="Jane Doe" required />
              <Field label="Phone" value={form.phone} onChange={(v) => set("phone", v)} placeholder="818-555-0123" />
              <Field label="Email" full value={form.email} onChange={(v) => set("email", v)} placeholder="you@email.com" type="email" required />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-line bg-canvas p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Plan</span>
                  <span className="font-display font-semibold text-brand-900">{plan.name} {plan.eligibility ? `(${plan.eligibility})` : ""}</span>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-line pt-2">
                  <span className="text-sm text-muted">Billed annually</span>
                  <span className="font-display text-xl font-bold text-brand-700">{formatCurrency(plan.priceCents)}</span>
                </div>
              </div>
              <div className="rounded-2xl border border-line bg-canvas p-5 text-sm text-ink-soft">
                <p><strong>{form.name || "—"}</strong> · {form.email || "—"} · {form.phone || "—"}</p>
                {form.business && <p className="mt-1">{form.business}</p>}
              </div>
              <p className="text-xs text-muted">By submitting, you agree your membership is subject to board approval, with a full refund if not approved. Payment is collected securely via Stripe at the next step (disabled in this demo).</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {error && <p className="mt-4 rounded-xl bg-danger-soft px-4 py-3 text-sm text-danger">{error}</p>}

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className={cn("flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium text-ink-soft hover:bg-brand-50", step === 0 && "invisible")}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        {step < 2 ? (
          <button onClick={() => setStep((s) => s + 1)} className="flex items-center gap-1.5 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-600">
            Continue <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button onClick={submit} disabled={submitting} className="flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-60">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit application"}
          </button>
        )}
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text", full, required,
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; full?: boolean; required?: boolean;
}) {
  return (
    <label className={cn("block", full && "sm:col-span-2")}>
      <span className="mb-1.5 block text-sm font-medium text-ink-soft">{label}{required && <span className="text-danger"> *</span>}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-line bg-canvas px-4 text-sm outline-none transition focus:border-brand-500 focus:bg-surface"
      />
    </label>
  );
}
