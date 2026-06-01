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
        "relative flex flex-col rounded-2xl border bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
        plan.popular ? "border-brand-300 ring-2 ring-brand-200" : "border-line"
      )}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge tone="premium">Most popular</Badge>
        </div>
      )}
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-brand-900">{plan.name}</h3>
        <Badge tone="neutral">{plan.audience}</Badge>
      </div>
      {plan.eligibility && <p className="mt-1 text-sm text-muted">{plan.eligibility}</p>}
      <div className="mt-4 flex items-baseline gap-1">
        <span className="font-display text-4xl font-bold text-brand-900">{formatCurrency(plan.priceCents)}</span>
        <span className="text-sm text-muted">/ year</span>
      </div>
      <ul className="mt-6 flex-1 space-y-3">
        {plan.benefits.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-sm text-ink-soft">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
              <Check className="h-3 w-3" />
            </span>
            {b}
          </li>
        ))}
      </ul>
      <ButtonLink
        href={`/membership/apply?plan=${plan.key}`}
        variant={plan.popular ? "primary" : "secondary"}
        className="mt-6 w-full"
      >
        Choose {plan.name}
      </ButtonLink>
    </div>
  );
}
