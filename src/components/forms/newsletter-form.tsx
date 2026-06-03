"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { subscribeNewsletter } from "@/app/actions/forms";
import { cn } from "@/lib/utils";

export function NewsletterForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const dark = tone === "dark";

  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    setError(null);
    const res = await subscribeNewsletter(email);
    if (res.ok) {
      setState("done");
    } else {
      setError(res.error ?? "Please try again.");
      setState("idle");
    }
  }

  return (
    <AnimatePresence mode="wait">
      {state === "done" ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium",
            dark ? "bg-white/10 text-white" : "bg-brand-50 text-brand-700"
          )}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2a7fb8] text-white">
            <Check className="h-3.5 w-3.5" />
          </span>
          You&apos;re subscribed. Welcome to the Village!
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={onSubmit} className="flex flex-col gap-2">
          <div className="flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className={cn(
              "h-11 w-full rounded-xl border px-4 text-sm outline-none transition",
              dark
                ? "border-white/15 bg-white/10 text-white placeholder:text-white/40 focus:border-brand-300"
                : "border-line bg-canvas text-ink placeholder:text-faint focus:border-brand-500"
            )}
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="flex h-11 shrink-0 items-center gap-2 rounded-xl bg-[#2a7fb8] px-4 text-sm font-medium text-white transition hover:bg-[#236d9f] disabled:opacity-60"
          >
            {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
          </button>
          </div>
          {error && <p className={cn("text-xs", dark ? "text-red-300" : "text-danger")}>{error}</p>}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
