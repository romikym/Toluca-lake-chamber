"use client";

import Link from "next/link";
import { Eye, CalendarCheck, MessageSquare, Sparkles, ArrowRight, BadgeCheck, Receipt } from "lucide-react";
import { StatTile, BarChart, Panel, ProgressRing } from "@/components/dashboard/widgets";
import { Badge } from "@/components/ui/badge";
import { events } from "@/lib/data";
import { formatDate } from "@/lib/utils";

const views = [
  { label: "Jan", value: 120 }, { label: "Feb", value: 168 }, { label: "Mar", value: 145 },
  { label: "Apr", value: 210 }, { label: "May", value: 264 }, { label: "Jun", value: 232 },
];

export default function PortalDashboard() {
  const myEvents = events.slice(0, 3);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-900">Welcome back, Taylor</h1>
          <p className="text-sm text-muted">Here&apos;s what&apos;s happening with your membership.</p>
        </div>
        <Badge tone="success"><BadgeCheck className="h-3.5 w-3.5" /> Active member</Badge>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile icon={Eye} label="Profile views (30d)" value={1264} delta="+12%" deltaTone="up" />
        <StatTile icon={CalendarCheck} label="Events registered" value={4} delta="+1" deltaTone="up" />
        <StatTile icon={MessageSquare} label="Directory inquiries" value={18} delta="+5" deltaTone="up" />
        <StatTile icon={Receipt} label="Open invoices" value={0} delta="Paid" deltaTone="flat" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BarChart data={views} label="Profile views over time" />
        </div>
        <Panel title="Membership status">
          <ProgressRing value={72} label="Listing complete" sub="Add hours & 2 more photos to reach 100%." />
          <div className="mt-5 rounded-xl bg-brand-50 p-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted">Renews</span>
              <span className="font-semibold text-brand-800">Mar 14, 2027</span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-muted">Plan</span>
              <span className="font-semibold text-brand-800">Business · $300/yr</span>
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Panel title="Your upcoming events" action={<Link href="/portal/events" className="text-sm text-brand-600 hover:underline">View all</Link>}>
            <ul className="divide-y divide-line">
              {myEvents.map((e) => (
                <li key={e.slug} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-brand-900">{e.title}</p>
                    <p className="text-xs text-muted">{formatDate(e.start, { weekday: "short", month: "short", day: "numeric" })} · {e.location}</p>
                  </div>
                  <Badge tone="brand">Registered</Badge>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <Link href="/portal/ai" className="group flex flex-col justify-between rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-700 to-brand-500 p-6 text-white shadow-sm">
          <div>
            <Sparkles className="h-7 w-7" />
            <h3 className="mt-3 font-display text-lg font-semibold">AI member tools</h3>
            <p className="mt-1 text-sm text-white/80">Write your business description, social posts, and more with Claude.</p>
          </div>
          <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium">
            Open AI tools <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </div>
  );
}
