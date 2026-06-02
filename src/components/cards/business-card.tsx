import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GradientAvatar } from "@/components/ui/gradient";
import { categoryName, type Business } from "@/lib/data";
import { cn } from "@/lib/utils";

export function BusinessCard({ b }: { b: Business }) {
  return (
    <Link
      href={`/directory/${b.slug}`}
      className={cn(
        "card-glass card-glass-lift group relative flex flex-col rounded-3xl p-6",
        b.tier === "PREMIUM" && "ring-1 ring-brand-200/70"
      )}
    >
      <div className="flex items-start gap-4">
        <GradientAvatar name={b.name} hue={b.hue} className="h-14 w-14 shrink-0 text-base" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            {b.tier === "PREMIUM" && <Badge tone="premium">Premium</Badge>}
            {b.tier === "FEATURED" && <Badge tone="spring">Featured</Badge>}
          </div>
          <h3 className="mt-1.5 truncate font-display text-base font-semibold text-brand-900">
            {b.name}
          </h3>
          <p className="truncate text-sm text-muted">{categoryName(b.category)}</p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-all duration-500 group-hover:bg-brand-500 group-hover:text-white group-hover:rotate-45">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-ink-soft">{b.tagline}</p>
      <div className="mt-4 flex items-center gap-1.5 text-xs text-muted">
        <MapPin className="h-3.5 w-3.5" /> Toluca Lake, CA
      </div>
    </Link>
  );
}
