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
      className="card-glass card-glass-lift group flex flex-col overflow-hidden rounded-3xl"
    >
      <GradientCover name={e.title} hue={e.hue} className="h-40">
        <div className="absolute left-4 top-4 flex flex-col items-center rounded-2xl bg-white/95 px-3.5 py-2 shadow-md backdrop-blur">
          <span className="text-[10px] font-bold tracking-wide text-brand-600">{month}</span>
          <span className="font-display text-2xl font-bold leading-none text-brand-900">{day}</span>
        </div>
        <div className="absolute right-4 top-4 flex gap-2">
          {e.price === 0 ? <Badge tone="spring">Free</Badge> : <Badge tone="neutral">${e.price / 100}</Badge>}
          {e.membersOnly && <Badge tone="premium">Members</Badge>}
        </div>
      </GradientCover>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold leading-snug text-brand-900">{e.title}</h3>
        <div className="mt-3 space-y-1.5 text-sm text-muted">
          <p className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-brand-500" /> {formatDate(e.start, { weekday: "short" })} {String.fromCharCode(183)} {time}</p>
          <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-brand-500" /> {e.location}</p>
        </div>
        <p className="mt-4 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-soft">{e.summary}</p>
        <div className="mt-5 flex items-center justify-between">
          {almostFull ? (
            <span className="text-xs font-semibold text-warning">Almost full</span>
          ) : (
            <span className="text-xs text-muted">{e.capacity - e.registered} spots left</span>
          )}
          <span className="flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-all group-hover:gap-2">
            Details <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
