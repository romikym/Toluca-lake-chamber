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
    else { setError(res.error ?? "Please try again."); setState("idle"); }
  }

  if (state === "done") {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-line bg-surface p-10 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-600">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold text-brand-900">Thanks for reaching out!</h3>
        <p className="mt-2 text-sm text-ink-soft">We&apos;ve received your message and will be in touch soon.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" name="firstName" />
        <Field label="Last name" name="lastName" />
        <Field label="Email" name="email" type="email" required full />
        <Field label="Phone" name="phone" />
      </div>

      <div className="mt-4">
        <span className="mb-1.5 block text-sm font-medium text-ink-soft">I&apos;d like to learn more about</span>
        <div className="flex flex-wrap gap-2">
          {interests.map((i) => (
            <button
              type="button"
              key={i}
              onClick={() => setInterest(i)}
              className={cn("rounded-full border px-3.5 py-1.5 text-sm transition-colors", interest === i ? "border-brand-500 bg-brand-500 text-white" : "border-line bg-canvas text-ink-soft hover:border-brand-300")}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-sm font-medium text-ink-soft">Message <span className="text-danger">*</span></span>
        <textarea name="message" required rows={5} className="w-full rounded-xl border border-line bg-canvas p-4 text-sm outline-none transition focus:border-brand-500 focus:bg-surface" placeholder="How can we help?" />
      </label>

      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-danger-soft px-4 py-3 text-sm text-danger">
          <AlertCircle className="h-4 w-4 shrink-0" /> {error}
        </div>
      )}

      <button type="submit" disabled={state === "loading"} className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-500 font-medium text-white transition hover:bg-brand-600 disabled:opacity-60 sm:w-auto sm:px-8">
        {state === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Send Message <Send className="h-4 w-4" /></>}
      </button>

      <div className="mt-6 flex flex-col items-start gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          Prefer to reach us directly?{" "}
          <a href={`mailto:${site.email}`} className="font-medium text-brand-600 hover:underline">{site.email}</a>
        </p>
        <div className="flex gap-2">
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600 hover:bg-brand-100" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
          <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600 hover:bg-brand-100" aria-label="Facebook"><Facebook className="h-4 w-4" /></a>
        </div>
      </div>
    </form>
  );
}

function Field({ label, name, type = "text", required, full }: { label: string; name: string; type?: string; required?: boolean; full?: boolean }) {
  return (
    <label className={cn("block", full && "sm:col-span-2")}>
      <span className="mb-1.5 block text-sm font-medium text-ink-soft">{label}{required && <span className="text-danger"> *</span>}</span>
      <input name={name} type={type} required={required} className="h-11 w-full rounded-xl border border-line bg-canvas px-4 text-sm outline-none transition focus:border-brand-500 focus:bg-surface" />
    </label>
  );
}
