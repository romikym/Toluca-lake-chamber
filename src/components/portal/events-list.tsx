"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarPlus, MapPin, Clock, Loader2, CalendarX } from "lucide-react";
import { Panel } from "@/components/dashboard/widgets";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { cancelMyRegistration } from "@/app/actions/member";
import { formatDate } from "@/lib/utils";

type Reg = {
  id: string; status: string; slug: string; title: string;
  start: string; location: string; past: boolean;
};

export function MyEventsList({ registrations }: { registrations: Reg[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function onCancel(r: Reg) {
    if (!confirm(`Cancel your registration for "${r.title}"?`)) return;
    setBusy(r.id);
    const res = await cancelMyRegistration(r.id);
    setBusy(null);
    if (res.ok) router.refresh();
    else alert(res.error);
  }

  const upcoming = registrations.filter((r) => !r.past);
  const past = registrations.filter((r) => r.past);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-900">My Events</h1>
          <p className="text-sm text-muted">Events you&apos;ve registered for.</p>
        </div>
        <ButtonLink href="/events" variant="secondary"><CalendarPlus className="h-4 w-4" /> Browse events</ButtonLink>
      </div>

      <Panel title={`Registered${upcoming.length ? ` · ${upcoming.length}` : ""}`}>
        {upcoming.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-400"><CalendarX className="h-6 w-6" /></span>
            <p className="text-sm text-muted">You haven&apos;t registered for any upcoming events yet.</p>
            <ButtonLink href="/events" size="sm">Find an event</ButtonLink>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {upcoming.map((r) => {
              const time = new Date(r.start).toLocaleString("en-US", { hour: "numeric", minute: "2-digit" });
              return (
                <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                  <div>
                    <Link href={`/events/${r.slug}`} className="font-medium text-brand-900 hover:text-brand-600">{r.title}</Link>
                    <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {formatDate(r.start, { weekday: "short", month: "short", day: "numeric" })} · {time}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {r.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge tone="brand">Registered</Badge>
                    <button onClick={() => onCancel(r)} disabled={busy === r.id} className="flex items-center gap-1 rounded-lg border border-line px-3 py-1.5 text-xs text-muted transition hover:border-danger/40 hover:text-danger disabled:opacity-60">
                      {busy === r.id && <Loader2 className="h-3 w-3 animate-spin" />} Cancel
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Panel>

      {past.length > 0 && (
        <Panel title="Past">
          <ul className="divide-y divide-line">
            {past.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <Link href={`/events/${r.slug}`} className="text-sm font-medium text-ink-soft hover:text-brand-600">{r.title}</Link>
                  <div className="mt-0.5 text-xs text-muted">{formatDate(r.start, { month: "short", day: "numeric", year: "numeric" })}</div>
                </div>
                <Badge tone="neutral">Attended</Badge>
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </div>
  );
}
