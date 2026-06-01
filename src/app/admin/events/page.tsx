import Link from "next/link";
import { Plus, Users, QrCode } from "lucide-react";
import { Panel } from "@/components/dashboard/widgets";
import { Badge } from "@/components/ui/badge";
import { getEvents, getPrograms } from "@/server/queries";
import { formatDate } from "@/lib/utils";

export default async function AdminEvents() {
  const [events, programs] = await Promise.all([getEvents(), getPrograms()]);
  const programName = (slug: string) => programs.find((p) => p.slug === slug)?.name ?? "—";
  const sorted = [...events].sort((a, b) => +new Date(a.start) - +new Date(b.start));
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-900">Events</h1>
          <p className="text-sm text-muted">Manage events, registrations, and check-in.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"><Plus className="h-4 w-4" /> Create event</button>
      </div>

      <Panel title="All events">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                <th className="py-3 font-medium">Event</th>
                <th className="py-3 font-medium">Date</th>
                <th className="py-3 font-medium">Program</th>
                <th className="py-3 font-medium">Registered</th>
                <th className="py-3 font-medium text-right">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {sorted.map((e) => {
                const pct = Math.round((e.registered / e.capacity) * 100);
                return (
                  <tr key={e.slug} className="hover:bg-brand-50/40">
                    <td className="py-3"><Link href={`/events/${e.slug}`} className="font-medium text-brand-900 hover:text-brand-600">{e.title}</Link></td>
                    <td className="py-3 text-ink-soft">{formatDate(e.start, { month: "short", day: "numeric", year: "numeric" })}</td>
                    <td className="py-3"><Badge tone="neutral">{programName(e.program)}</Badge></td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-ink-soft"><Users className="h-3.5 w-3.5" /> {e.registered}/{e.capacity}</span>
                        <div className="hidden h-1.5 w-16 rounded-full bg-brand-100 sm:block"><div className="h-full rounded-full bg-brand-500" style={{ width: `${pct}%` }} /></div>
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <button className="inline-flex items-center gap-1 rounded-lg border border-line px-2.5 py-1.5 text-xs text-ink-soft hover:text-brand-600"><QrCode className="h-3.5 w-3.5" /> Check-in</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
