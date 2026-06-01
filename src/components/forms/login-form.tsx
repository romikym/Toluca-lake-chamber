"use client";

import { useActionState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { authenticate } from "@/app/actions/auth";

export function LoginForm() {
  const [error, formAction, pending] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className="mt-7 space-y-4">
      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-danger-soft px-4 py-3 text-sm text-danger">
          <AlertCircle className="h-4 w-4 shrink-0" /> {error}
        </div>
      )}
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink-soft">Email</span>
        <input name="email" type="email" required defaultValue="admin@tolucalakechamber.com" className="h-11 w-full rounded-xl border border-line bg-canvas px-4 text-sm outline-none focus:border-brand-500" placeholder="you@email.com" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink-soft">Password</span>
        <input name="password" type="password" required defaultValue="admin123" className="h-11 w-full rounded-xl border border-line bg-canvas px-4 text-sm outline-none focus:border-brand-500" placeholder="••••••••" />
      </label>
      <button type="submit" disabled={pending} className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-500 font-medium text-white transition hover:bg-brand-600 disabled:opacity-60">
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
      </button>
    </form>
  );
}
