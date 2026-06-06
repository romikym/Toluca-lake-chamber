import type { Metadata } from "next";
import { Tag, Ticket, Megaphone, Users, Percent, Store } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { heroImages } from "@/lib/images";
import { Container } from "@/components/ui/container";
import { SectionHeader, Eyebrow } from "@/components/ui/section-header";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { offers } from "@/lib/offers";

export const metadata: Metadata = {
  title: "Member Perks — Discounts & Offers",
  description:
    "Exclusive discounts and offers from Toluca Lake Chamber members, plus the everyday benefits of belonging. Membership that pays for itself.",
};

const benefits = [
  { icon: Megaphone, title: "Marketing exposure", body: "A rich directory profile, newsletter features, and visibility across the Village." },
  { icon: Users, title: "Networking & events", body: "Mixers, signature events, and member-only pricing that turn neighbors into clients." },
  { icon: Ticket, title: "Member pricing", body: "Discounted or exclusive access to Chamber events throughout the year." },
  { icon: Percent, title: "Member-to-member deals", body: "Real discounts from fellow members — the perks below pay for your dues." },
];

export default function PerksPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership that pays for itself"
        image={heroImages.perks}
        title="Perks, discounts & offers"
        description="Belonging to the Chamber comes with real, redeemable value — exclusive member deals from local businesses, plus the exposure and connections that grow your bottom line."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Membership", href: "/membership" }, { label: "Perks" }]}
      >
        <ButtonLink href="/membership/apply" size="lg">Become a member</ButtonLink>
      </PageHero>

      {/* Membership value */}
      <section className="section">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Why it's worth it"
            title={<>The benefits behind the <span className="text-gradient-spring display-italic">card</span></>}
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <StaggerItem key={b.title}>
                <div className="card-glass card-glass-lift h-full rounded-[1.75rem] p-7">
                  <span className="icon-emerald flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-emerald-soft">
                    <b.icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-brand-900">{b.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{b.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* The offers */}
      <section className="bg-brand-50/40 py-20 sm:py-24">
        <Container>
          <SectionHeader
            eyebrow="Member discounts & offers"
            title="Deals from your neighbors"
            description="Redeem these at member businesses across the Village. Members-only offers require a current membership; community offers are open to all."
          />
          <Stagger className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((o) => (
              <StaggerItem key={o.id}>
                <div className="card-glass card-glass-lift flex h-full flex-col rounded-[1.75rem] p-7">
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-display text-sm font-bold text-white shadow-emerald-soft"
                      style={{ backgroundImage: `linear-gradient(135deg, hsl(${o.hue} 70% 42%), hsl(${o.hue + 18} 72% 30%))` }}
                    >
                      <Tag className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <Badge tone={o.audience === "members" ? "premium" : "spring"}>
                      {o.audience === "members" ? "Members only" : "Open to all"}
                    </Badge>
                  </div>
                  <div className="mt-5">
                    <span className="font-display text-2xl font-bold text-brand-700">{o.deal}</span>
                    <h3 className="mt-1 font-display text-lg font-semibold text-brand-900">{o.headline}</h3>
                    <p className="mt-1 text-sm font-medium text-muted">{o.business} · {o.category}</p>
                  </div>
                  <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-ink-soft">{o.detail}</p>
                  {o.code && (
                    <div className="mt-5 flex items-center gap-2 rounded-xl border border-dashed border-brand-300 bg-brand-50/60 px-4 py-2.5">
                      <span className="text-xs font-medium text-muted">Code</span>
                      <span className="font-mono text-sm font-bold tracking-wider text-brand-800">{o.code}</span>
                    </div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-28">
        <Container>
          <Reveal>
            <div
              className="relative overflow-hidden rounded-[2.5rem] px-8 py-14 sm:px-14"
              style={{ background: "linear-gradient(120deg, #001d16 0%, #00563f 55%, #0a6b4e 100%)" }}
            >
              <div className="absolute inset-0 bg-grid opacity-[0.12]" />
              <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                <div className="max-w-xl">
                  <Eyebrow tone="dark">Want in?</Eyebrow>
                  <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white text-balance">
                    Members post their own offers
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-white/85">
                    Join the Chamber to redeem these deals — and to feature your own business right here, in front of the whole Village.
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-3">
                  <ButtonLink href="/membership/apply" size="lg"><Store className="h-4 w-4" /> Join the Chamber</ButtonLink>
                  <ButtonLink href="/membership" variant="glass-dark" size="lg">See plans</ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
