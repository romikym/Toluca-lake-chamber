"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Loader2 } from "lucide-react";
import { startDonation } from "@/app/actions/payments";
import { cn, formatCurrency } from "@/lib/utils";

const presets = [2500, 5000, 10000, 25000];

export function DonateWidget() {
  const [amount, setAmount] = useState(5000);
  const [custom, setCustom] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const value = custom ? Math.round(parseFloat(custom) * 100) || 0 : amount;

  async function donate() {
    if (value < 100) return;
    setState("loading");
    setError(null);
    const res = await startDonation({ amountCents: value, recurring });
    if (res.url) {
      window.location.href = res.url; // redirect to Stripe Checkout
      return;
    }
    if (res.error) {
      setError(res.error);
      setState("idle");
      return;
    }
    setState("done"); // simulated (no Stripe key) — donation recorded in DB
  }

  if (state === "done") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl border border-line bg-surface p-10 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-600"><Heart className="h-8 w-8" /></div>
        <h2 className="mt-5 font-display text-2xl font-bold text-brand-900">Thank you!</h2>
        <p className="mx-auto mt-3 max-w-sm text-ink-soft">Your generosity helps keep the Village thriving.</p>
      </motion.div>
    );
  }

  return (
    <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex rounded-xl bg-brand-50 p-1">
        <button onClick={() => setRecurring(false)} className={cn("flex-1 rounded-lg py-2 text-sm font-medium transition", !recurring ? "bg-surface text-brand-700 shadow-sm" : "text-muted")}>One-time</button>
        <button onClick={() => setRecurring(true)} className={cn("flex-1 rounded-lg py-2 text-sm font-medium transition", recurring ? "bg-surface text-brand-700 shadow-sm" : "text-muted")}>Monthly</button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {presets.map((p) => (
          <button
            key={p}
            onClick={() => { setAmount(p); setCustom(""); }}
            className={cn("rounded-xl border py-3 font-display text-lg font-semibold transition-all", value === p && !custom ? "border-brand-400 bg-brand-50 text-brand-700 ring-2 ring-brand-200" : "border-line text-ink-soft hover:border-brand-300")}
          >
            {formatCurrency(p)}
          </button>
        ))}
      </div>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-sm font-medium text-ink-soft">Or enter a custom amount</span>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">$</span>
          <input
            value={custom}
            onChange={(e) => setCustom(e.target.value.replace(/[^0-9.]/g, ""))}
            inputMode="decimal"
            placeholder="100"
            className="h-12 w-full rounded-xl border border-line bg-canvas pl-8 pr-4 text-sm outline-none focus:border-brand-500"
          />
        </div>
      </label>

      {error && <p className="mt-3 text-center text-sm text-danger">{error}</p>}
      <button onClick={donate} disabled={state === "loading" || value <= 0} className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2a7fb8] font-medium text-white transition hover:bg-[#236d9f] disabled:opacity-60">
        {state === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Donate {value > 0 ? formatCurrency(value) : ""}{recurring ? "/mo" : ""} <Heart className="h-4 w-4" /></>}
      </button>
      <p className="mt-3 text-center text-xs text-muted">Secure donation · Stripe-powered</p>
    </div>
  );
}
