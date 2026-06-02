import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GradientAvatar } from "@/components/ui/gradient";
import { sponsors } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sponsors",
  description: "The generous businesses and organizations that power Toluca Lake Chamber programs and events.",
};

const tierTone: Record<string, "premium" | "brand" | "neutral"> = {
  Title: "premium", Platinum: "premium", Gold: "brand", Silver: "neutral", Bronze: "neutral",
};

export default function SponsorsPage() {
  return (
    <>
      <PageHero
        eyebrow="With gratitude"
        title="Our community sponsors"
        description="Our programs and events are made possible by the generous support of these local businesses and organizations."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Sponsors" }]}
      />
      <section className="section">
        <Container>
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sponsors.map((s) => (
              <StaggerItem key={s.name}>
                <div className="card-glass card-glass-lift flex h-full flex-col items-center gap-4 rounded-3xl p-8 text-center">
                  <GradientAvatar name={s.name} hue={s.hue} className="h-20 w-20 rounded-2xl text-xl" />
                  <div>
                    <h3 className="font-display text-lg font-semibold text-brand-900">{s.name}</h3>
                    <div className="mt-2"><Badge tone={tierTone[s.tier] ?? "neutral"}>{s.tier} Sponsor</Badge></div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="card-glass mt-16 flex flex-col items-center gap-5 rounded-3xl p-12 text-center">
            <h2 className="font-display text-3xl font-semibold text-brand-900">Become a sponsor</h2>
            <p className="max-w-md text-sm leading-relaxed text-ink-soft">Put your brand in front of the Village and support the programs that make Toluca Lake special.</p>
            <ButtonLink href="/contact">Get in touch <ArrowRight className="h-4 w-4" /></ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
