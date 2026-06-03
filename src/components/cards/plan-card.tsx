import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Plan } from "@/lib/data";

export function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={cn(
        "card-glass card-glass-lift relative flex flex-col rounded-[1.75rem] p-8 sm:p-9",
        plan.popular && "ring-2 ring-spring/60 shadow-[0_28px_70px_-22px_rgba(0,167,109,0.28)]"
      )}
    >
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Badge tone="premium">Most members choose this</Badge>
        </div>
      )}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-2xl font-semibold text-brand-900">{plan.name}</h3>
        <Badge tone="outline">{plan.audience}</Badge>
      </div>
      {plan.eligibility && (
        <p className="mt-2 text-sm text-muted">{plan.eligibility}</p>
      )}
      <div className="mt-6 flex items-baseline gap-1.5">
        <span className={cn("font-display text-5xl font-bold leading-none", plan.popular ? "text-gradient-brand" : "text-brand-900")}>
          {formatCurrency(plan.priceCents)}
        </span>
        <span className="text-sm text-muted">/ year</span>
      </div>
      <ul className="mt-8 flex-1 space-y-3.5">
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
}
