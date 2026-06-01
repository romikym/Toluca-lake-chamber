import Link from "next/link";
import { CalendarPlus, MapPin, Clock } from "lucide-react";
import { Panel } from "@/components/dashboard/widgets";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { events } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default function PortalEventsPage() {
  const registered = events.slice(0, 4);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-900">My Events</h1>
          <p className="text-sm text-muted">Events you&apos;ve registered for and ones you might like.</p>
        </div>
        <ButtonLink href="/events" variant="secondary"><CalendarPlus className="h-4 w-4" /> Browse events</ButtonLink>
      </div>

      <Panel title="Registered">
        <ul className="divide-y divide-line">
          {registered.map((e) => {
            const time = new Date(e.start).toLocaleString("en-US", { hour: "numeric", minute: "2-digit" });
            return (
              <li key={e.slug} className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div>
                  <Link href={`/events/${e.slug}`} className="font-medium text-brand-900 hover:text-brand-600">{e.title}</Link>
                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {formatDate(e.start, { weekday: "short", month: "short", day: "numeric" })} · {time}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {e.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone="brand">Registered</Badge>
                  <button className="rounded-lg border border-line px-3 py-1.5 text-xs text-muted hover:text-danger">Cancel</button>
                </div>
              </li>
            );
          })}
        </ul>
      </Panel>
    </div>
  );
}
