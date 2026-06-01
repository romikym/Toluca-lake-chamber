"use client";

import Link from "next/link";
import { Users, DollarSign, CalendarDays, UserPlus, Sparkles, ArrowRight, Heart } from "lucide-react";
import { StatTile, BarChart, Panel } from "@/components/dashboard/widgets";
import { Badge } from "@/components/ui/badge";
import { GradientAvatar } from "@/components/ui/gradient";
import { formatCurrency } from "@/lib/utils";

type Data = {
  members: number; events: number; subscribers: number; applications: number;
  revenueCents: number; aiGenerations: number;
  byTier: { label: string; n: number; w: number }[];
  recentDonations: { amountCents: number; recurring: boolean }[];
  recentSubmissions: { name: string; interest: string }[];
};

export function OverviewView({ data, pending }: { data: Data; pending: { id: string; name: string; detail: string }[] }) {
  const chart = data.byTier.map((t) => ({ label: t.label.split(" ")[0], value: t.n }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-brand-900">Overview</h1>
        <p className="text-sm text-muted">A live snapshot of the Chamber — straight from the database.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile icon={Users} label="Member businesses" value={data.members} delta="Directory" deltaTone="flat" />
        <StatTile icon={DollarSign} label="Revenue recorded" value={Math.round(data.revenueCents / 100)} prefix="$" delta="all time" deltaTone="up" />
        <StatTile icon={CalendarDays} label="Events" value={data.events} delta="published" deltaTone="flat" />
        <StatTile icon={UserPlus} label="New applications" value={data.applications} delta={data.applications ? "review" : "none"} deltaTone="flat" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BarChart data={chart.length ? chart : [{ label: "—", value: 0 }]} label="Members by directory tier" />
        </div>
        <Panel title="Pending applications" action={<Link href="/admin/members" className="text-sm text-brand-600 hover:underline">All</Link>}>
          {pending.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted">No pending applications.</p>
          ) : (
            <ul className="space-y-3">
              {pending.map((p) => (
                <li key={p.id} className="flex items-center gap-3">
                  <GradientAvatar name={p.name} hue={150} className="h-9 w-9 rounded-full text-[11px]" rounded="rounded-full" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-brand-900">{p.name}</p>
                    <p className="truncate text-xs text-muted">{p.detail}</p>
                  </div>
                  <Badge tone="info">New</Badge>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Membership by tier">
          <ul className="space-y-3 text-sm">
            {data.byTier.map((r) => (
              <li key={r.label}>
                <div className="flex justify-between"><span className="text-ink-soft">{r.label}</span><span className="font-medium text-brand-900">{r.n}</span></div>
                <div className="mt-1 h-1.5 rounded-full bg-brand-100"><div className="h-full rounded-full bg-brand-500" style={{ width: `${r.w}%` }} /></div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Recent activity">
          <ul className="space-y-3 text-sm text-ink-soft">
            {data.recentDonations.map((d, i) => (
              <li key={`d${i}`} className="flex items-center gap-2"><Heart className="h-3.5 w-3.5 text-brand-500" /> Donation — <strong className="text-brand-900">{formatCurrency(d.amountCents)}</strong>{d.recurring ? "/mo" : ""}</li>
            ))}
            {data.recentSubmissions.map((s, i) => (
              <li key={`s${i}`}>💬 <strong className="text-brand-900">{s.name}</strong> — {s.interest}</li>
            ))}
            {data.recentDonations.length === 0 && data.recentSubmissions.length === 0 && (
              <li className="text-muted">No recent activity yet.</li>
            )}
          </ul>
        </Panel>

        <Link href="/admin/ai" className="group flex flex-col justify-between rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-700 to-brand-500 p-6 text-white shadow-sm">
          <div>
            <Sparkles className="h-7 w-7" />
            <h3 className="mt-3 font-display text-lg font-semibold">AI Studio</h3>
            <p className="mt-1 text-sm text-white/80">{data.aiGenerations} generations logged. Draft newsletters, spotlights, and reports.</p>
          </div>
          <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium">Open AI Studio <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
        </Link>
      </div>
    </div>
  );
}
