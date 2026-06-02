"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, Send, AlertCircle, Instagram, Facebook } from "lucide-react";
import { submitContact } from "@/app/actions/forms";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const interests = [
  "Membership Information",
  "Networking Mixers",
  "Pancake Breakfast Fundraiser",
  "Community Howl",
  "Holiday Open House",
  "Sponsorship Opportunities",
  "Volunteer Opportunities",
  "General Inquiry",
];

export function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [interest, setInterest] = useState("Membership Information");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setError(null);
    const fd = new FormData(e.currentTarget);
    const res = await submitContact({
      firstName: String(fd.get("firstName") ?? ""),
      lastName: String(fd.get("lastName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      interest,
      message: String(fd.get("message") ?? ""),
    });
    if (res.ok) setState("done");
    else {
      setError(res.error ?? "Please try again.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#5be2a1] to-[#00a76d] text-white shadow-emerald">
          <Check className="h-7 w-7" strokeWidth={3} />
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold text-brand-900">Thanks for reaching out!</h3>
        <p className="mt-3 text-sm text-ink-soft">We have received your message and will be in touch soon.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" name="firstName" />
        <Field label="Last name" name="lastName" />
        <Field label="Email" name="email" type="email" required full />
        <Field label="Phone" name="phone" />
      </div>

      <div className="mt-5">
        <span className="mb-2 block text-sm font-semibold text-ink-soft">I would like to learn more about</span>
        <div className="flex flex-wrap gap-2">
          {interests.map((i) => (
            <button
              type="button"
              key={i}
              onClick={() => setInterest(i)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200",
                interest === i
                  ? "btn-gradient border-transparent text-white"
                  : "border-line bg-white/70 text-ink-soft hover:border-brand-300 hover:bg-brand-50"
              )}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-semibold text-ink-soft">Message <span className="text-danger">*</span></span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="How can we help?"
          className="w-full rounded-2xl border border-line bg-white/70 p-4 text-sm outline-none transition-all duration-200 focus:border-brand-500 focus:bg-white focus:shadow-emerald-soft"
        />
      </label>

      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-danger-soft px-4 py-3 text-sm text-danger">
          <AlertCircle className="h-4 w-4 shrink-0" /> {error}
        </div>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="btn-gradient mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-full font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 sm:w-auto sm:px-9"
      >
        {state === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : (
          <>Send Message <Send className="h-4 w-4" /></>
        )}
      </button>

      <div className="mt-7 flex flex-col items-start gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          Prefer to reach us directly?{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-brand-700 transition hover:text-brand-800">{site.email}</a>
        </p>
        <div className="flex gap-2">
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition hover:bg-brand-100" aria-label="Instagram">
            <Instagram className="h-4 w-4" />
          </a>
          <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition hover:bg-brand-100" aria-label="Facebook">
            <Facebook className="h-4 w-4" />
          </a>
        </div>
      </div>
    </form>
  );
}

function Field({ label, name, type = "text", required, full }: { label: string; name: string; type?: string; required?: boolean; full?: boolean }) {
  return (
    <label className={cn("block", full && "sm:col-span-2")}>
      <span className="mb-2 block text-sm font-semibold text-ink-soft">
        {label}
        {required && <span className="text-danger"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="h-11 w-full rounded-2xl border border-line bg-white/70 px-4 text-sm outline-none transition-all duration-200 focus:border-brand-500 focus:bg-white focus:shadow-emerald-soft"
      />
    </label>
  );
}
