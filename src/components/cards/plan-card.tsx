import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Plan } from "@/lib/data";

export function PlanCard({ plan }: { plan: Plan }) {
  const body = (
    <div className="card-glass card-glass-lift relative flex h-full flex-col rounded-[1.7rem] p-8 sm:p-9">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-2xl font-semibold text-brand-900">{plan.name}</h3>
        <Badge tone="outline">{plan.audience}</Badge>
      </div>
      {plan.eligibility && <p className="mt-2 text-sm text-muted">{plan.eligibility}</p>}

      <div className="mt-6 flex items-baseline gap-1.5">
        <span className={cn("font-display text-5xl font-bold leading-none", plan.popular ? "text-gradient-brand" : "text-brand-900")}>
          {formatCurrency(plan.priceCents)}
        </span>
        <span className="text-sm text-muted">/ year</span>
      </div>

      {/* Champagne-gold hairline — the members-club detail */}
      <div
        aria-hidden
        className="mt-7 h-px w-full rounded-full"
        style={{ background: "linear-gradient(90deg, transparent, rgba(199,168,103,0.55) 25%, rgba(199,168,103,0.55) 75%, transparent)" }}
      />

      <ul className="mt-7 flex-1 space-y-3.5">
        {plan.benefits.map((b) => (
          <li key={b} className="flex items-start gap-3 text-[15px] leading-snug text-ink-soft">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#5be2a1] to-[#00a76d] text-white shadow-emerald-soft">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            {b}
          </li>
        ))}
      </ul>

      <ButtonLink
        href={`/membership/apply?plan=${plan.key}`}
        variant={plan.popular ? "primary" : "secondary"}
        size="lg"
        className="mt-8 w-full"
      >
        Get started
      </ButtonLink>
    </div>
  );

  if (!plan.popular) return body;

  // Recommended tier — wrapped in a champagne-gold → emerald gradient frame and
  // lifted slightly for price-anchoring prominence.
  return (
    <div
      className="relative h-full rounded-[1.8rem] p-[1.5px] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:scale-[1.04]"
      style={{
        background: "linear-gradient(150deg, var(--color-gold-bright) 0%, var(--color-spring) 48%, var(--color-emerald) 100%)",
        boxShadow: "0 30px 72px -22px rgba(0,167,109,0.32), 0 0 38px -14px rgba(199,168,103,0.45)",
      }}
    >
      <div className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2">
        <Badge tone="premium">Most members choose this</Badge>
      </div>
      {body}
    </div>
  );
}
