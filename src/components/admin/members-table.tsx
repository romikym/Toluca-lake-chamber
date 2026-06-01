"use client";

import { useMemo, useState } from "react";
import { Search, Download, Plus, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GradientAvatar } from "@/components/ui/gradient";
import { categoryName, type Business } from "@/lib/data";
import { cn } from "@/lib/utils";

const tierFilters = ["All", "PREMIUM", "FEATURED", "STANDARD"];
const tierLabel = (t: string) => t[0] + t.slice(1).toLowerCase();

export function MembersTable({ businesses }: { businesses: Business[] }) {
  const [q, setQ] = useState("");
  const [tier, setTier] = useState("All");

  const rows = useMemo(
    () =>
      businesses.filter((b) => {
        const mq = !q || b.name.toLowerCase().includes(q.toLowerCase());
        const mt = tier === "All" || b.tier === tier;
        return mq && mt;
      }),
    [businesses, q, tier]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search members…" className="h-11 w-full rounded-xl border border-line bg-surface pl-10 pr-4 text-sm outline-none focus:border-brand-500" />
        </div>
        <div className="flex gap-1 rounded-xl border border-line bg-surface p-1">
          {tierFilters.map((s) => (
            <button key={s} onClick={() => setTier(s)} className={cn("rounded-lg px-3 py-1.5 text-sm font-medium", tier === s ? "bg-brand-100 text-brand-700" : "text-muted hover:text-brand-600")}>{s === "All" ? "All" : tierLabel(s)}</button>
          ))}
        </div>
        <button className="flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-4 text-sm font-medium text-ink-soft hover:bg-brand-50"><Download className="h-4 w-4" /> Export</button>
        <button className="flex h-11 items-center gap-2 rounded-xl bg-brand-500 px-4 text-sm font-medium text-white hover:bg-brand-600"><Plus className="h-4 w-4" /> Add</button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-canvas/60 text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-5 py-3 font-medium">Business</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Tier</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((b) => (
                <tr key={b.slug} className="hover:bg-brand-50/40">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <GradientAvatar name={b.name} hue={b.hue} className="h-9 w-9 rounded-lg text-[11px]" rounded="rounded-lg" />
                      <span className="font-medium text-brand-900">{b.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-ink-soft">{categoryName(b.category)}</td>
                  <td className="px-5 py-3"><Badge tone={b.tier === "PREMIUM" ? "premium" : b.tier === "FEATURED" ? "brand" : "neutral"}>{tierLabel(b.tier)}</Badge></td>
                  <td className="px-5 py-3"><Badge tone="success">Active</Badge></td>
                  <td className="px-5 py-3 text-right">
                    <button className="rounded-lg p-1.5 text-muted hover:bg-brand-50 hover:text-brand-600" aria-label="More"><MoreHorizontal className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && <p className="px-5 py-10 text-center text-sm text-muted">No members match your filters.</p>}
      </div>
    </div>
  );
}
