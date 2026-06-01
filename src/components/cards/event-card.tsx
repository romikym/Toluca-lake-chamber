import Link from "next/link";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GradientCover } from "@/components/ui/gradient";
import { type ChamberEvent } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export function EventCard({ e }: { e: ChamberEvent }) {
  const date = new Date(e.start);
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = date.getDate();
  const time = date.toLocaleString("en-US", { hour: "numeric", minute: "2-digit" });
  const almostFull = e.registered / e.capacity > 0.8;

  return (
    <Link
      href={`/events/${e.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <GradientCover name={e.title} hue={e.hue} className="h-36">
        <div className="absolute left-4 top-4 flex flex-col items-center rounded-xl bg-white/95 px-3 py-1.5 shadow-sm">
          <span className="text-[10px] font-semibold tracking-wide text-brand-500">{month}</span>
          <span className="font-display text-xl font-bold leading-none text-brand-900">{day}</span>
        </div>
        <div className="absolute right-4 top-4 flex gap-2">
          {e.price === 0 ? <Badge tone="brand">Free</Badge> : <Badge tone="neutral">${e.price / 100}</Badge>}
          {e.membersOnly && <Badge tone="premium">Members</Badge>}
        </div>
      </GradientCover>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-brand-900">{e.title}</h3>
        <div className="mt-2 space-y-1.5 text-sm text-muted">
          <p className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> {formatDate(e.start, { weekday: "short" })} · {time}</p>
          <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {e.location}</p>
        </div>
        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-soft">{e.summary}</p>
        <div className="mt-4 flex items-center justify-between">
          {almostFull ? (
            <span className="text-xs font-medium text-warning">Almost full</span>
          ) : (
            <span className="text-xs text-muted">{e.capacity - e.registered} spots left</span>
          )}
          <span className="flex items-center gap-1 text-sm font-medium text-brand-600 group-hover:gap-1.5">
            Details <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
