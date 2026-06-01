"use client";

import { Users, Mail, CalendarCheck, Heart } from "lucide-react";
import { StatTile, BarChart, Panel } from "@/components/dashboard/widgets";
import { formatCurrency } from "@/lib/utils";

type Data = {
  members: number; subscribers: number; attendance: number; donationsCents: number;
  byCategory: { label: string; value: number }[];
};

export function ReportsView({ data }: { data: Data }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-brand-900">Reports</h1>
        <p className="text-sm text-muted">Live metrics from the database.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile icon={Users} label="Member businesses" value={data.members} delta="directory" deltaTone="flat" />
        <StatTile icon={Mail} label="Newsletter subscribers" value={data.subscribers} delta="growing" deltaTone="up" />
        <StatTile icon={CalendarCheck} label="Event registrations" value={data.attendance} delta="all events" deltaTone="up" />
        <StatTile icon={Heart} label="Donations recorded" value={Math.round(data.donationsCents / 100)} prefix="$" delta="all time" deltaTone="up" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <BarChart data={data.byCategory.length ? data.byCategory : [{ label: "—", value: 0 }]} label="Members by category (top)" />
        <Panel title="Engagement insights">
          <ul className="space-y-2 text-sm text-ink-soft">
            <li>• <strong className="text-brand-900">{data.members}</strong> active member businesses across the directory.</li>
            <li>• <strong className="text-brand-900">{data.attendance}</strong> total event registrations recorded.</li>
            <li>• <strong className="text-brand-900">{data.subscribers}</strong> people subscribed to the newsletter.</li>
            <li>• <strong className="text-brand-900">{formatCurrency(data.donationsCents)}</strong> in donations recorded.</li>
            {data.byCategory[0] && <li>• <strong className="text-brand-900">{data.byCategory[0].label}</strong> is the largest member category.</li>}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
