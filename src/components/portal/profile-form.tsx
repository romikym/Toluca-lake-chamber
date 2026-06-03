"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Check } from "lucide-react";
import { Panel } from "@/components/dashboard/widgets";
import { Toggle } from "@/components/ui/toggle";
import { updateMemberProfile } from "@/app/actions/member";

const prefs = [
  { label: "Event reminders", desc: "24h and 1h before events you've registered for" },
  { label: "Membership renewal notices", desc: "When your renewal is approaching" },
  { label: "Community newsletter", desc: "Monthly news, events, and member spotlights" },
  { label: "Directory inquiries", desc: "When someone contacts you via your listing" },
];

export function ProfileForm({
  name, email, organization,
}: {
  name: string; email: string; organization: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    setBusy(true); setError(null); setSaved(false);
    const res = await updateMemberProfile({ name: String(fd.get("name") ?? "") });
    setBusy(false);
    if (res.ok) { setSaved(true); router.refresh(); setTimeout(() => setSaved(false), 2500); }
    else setError(res.error ?? "Something went wrong.");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-900">Profile</h1>
          <p className="text-sm text-muted">Your account details and preferences.</p>
        </div>
        <button type="submit" disabled={busy} className="flex items-center gap-2 rounded-full bg-[#2a7fb8] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#236d9f] disabled:opacity-60">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saved ? "Saved" : "Save"}
        </button>
      </div>

      {error && <p className="rounded-xl bg-danger-soft px-3 py-2 text-sm text-danger">{error}</p>}

      <Panel title="Account">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-ink-soft">Full name</span>
            <input name="name" defaultValue={name} required className="h-11 w-full rounded-xl border border-line bg-canvas px-4 text-sm outline-none focus:border-brand-500 focus:bg-surface" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink-soft">Email <span className="text-faint">(sign-in)</span></span>
            <input value={email} readOnly className="h-11 w-full cursor-not-allowed rounded-xl border border-line bg-line/30 px-4 text-sm text-muted outline-none" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink-soft">Organization</span>
            <input value={organization || "—"} readOnly className="h-11 w-full cursor-not-allowed rounded-xl border border-line bg-line/30 px-4 text-sm text-muted outline-none" />
          </label>
        </div>
        <p className="mt-3 text-xs text-muted">To change your sign-in email or linked business, contact the Chamber office.</p>
      </Panel>

      <Panel title="Notification preferences">
        <ul className="divide-y divide-line">
          {prefs.map((p, i) => (
            <li key={p.label} className="flex items-center justify-between py-3">
              <div>
                <div className="text-sm font-medium text-brand-900">{p.label}</div>
                <div className="text-xs text-muted">{p.desc}</div>
              </div>
              <Toggle defaultOn={i !== 3} />
            </li>
          ))}
        </ul>
      </Panel>
    </form>
  );
}
