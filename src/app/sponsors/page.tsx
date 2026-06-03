import type { Metadata } from "next";
import { ArrowRight, Megaphone, HeartHandshake, Users, Check, Award } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeader, Eyebrow } from "@/components/ui/section-header";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GradientAvatar } from "@/components/ui/gradient";
import { sponsors } from "@/lib/data";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sponsorship",
  description: "Put your brand at the heart of Toluca Lake. Sponsorship tiers, benefits, and how to partner with the Chamber.",
};

const tierTone: Record<string, "premium" | "brand" | "neutral"> = {
  Title: "premium", Platinum: "premium", Gold: "brand", Silver: "neutral", Bronze: "neutral",
};

const why = [
  { icon: Megaphone, title: "Be seen across the Village", body: "Your brand on the site, the newsletter, and at the events the community already shows up for." },
  { icon: HeartHandshake, title: "Goodwill that lasts", body: "Stand publicly behind the neighborhood — the kind of trust that advertising can't buy." },
  { icon: Users, title: "Real connections", body: "Meet the owners, leaders, and residents who shape Toluca Lake, in person, all year." },
];

const tiers = [
  {
    name: "Title", tagline: "The Village's marquee partner", marquee: true,
    benefits: ["Naming presence at our flagship events", "Premier logo placement site-wide & on event signage", "A featured spotlight and dedicated social features", "A speaking moment at signature gatherings", "Everything in Platinum"],
  },
  {
    name: "Platinum", tagline: "Front and center, all year",
    benefits: ["Logo on the homepage, events & newsletter", "On-site presence at major events", "A member spotlight feature", "Everything in Gold"],
  },
  {
    name: "Gold", tagline: "Strong, visible support",
    benefits: ["Logo on the sponsors page & event programs", "Recognition from the stage at events", "A newsletter mention", "Everything in Silver"],
  },
  {
    name: "Silver", tagline: "Proudly in the community",
    benefits: ["Listing on the sponsors page", "Recognition in event materials", "Our gratitude — and the Village's"],
  },
];

export default function SponsorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Partner with the Chamber"
        image="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1900&q=80"
        title="Put your brand at the heart of the Village"
        description="Chamber sponsors power the events, programs, and advocacy that keep Toluca Lake thriving — and earn lasting visibility and goodwill in return."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Sponsorship" }]}
      />

      {/* Why sponsor */}
      <section className="section">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Why sponsor"
            title={<>Visibility where the Village is <span className="text-gradient-spring display-italic">already looking</span></>}
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-3">
            {why.map((w) => (
              <StaggerItem key={w.title}>
                <div className="card-glass card-glass-lift h-full rounded-[1.75rem] p-8">
                  <span className="icon-emerald flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-emerald-soft">
                    <w.icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-brand-900">{w.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{w.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Tiers */}
      <section className="pb-24 sm:pb-28">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Sponsorship tiers"
            title="Choose your level of impact"
            description="Annual partnerships with custom packages available. Each tier includes everything in the one below it."
          />
          <Stagger className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map((t) => (
              <StaggerItem key={t.name}>
                <div className={cn(
                  "card-glass card-glass-lift relative flex h-full flex-col rounded-[1.75rem] p-7",
                  t.marquee && "ring-2 ring-spring/60 shadow-[0_28px_70px_-22px_rgba(0,167,109,0.28)]"
                )}>
                  {t.marquee && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2"><Badge tone="premium"><Award className="h-3.5 w-3.5" /> Marquee</Badge></div>
                  )}
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl font-semibold text-brand-900">{t.name}</h3>
                    <Badge tone={tierTone[t.name] ?? "neutral"}>{t.name}</Badge>
                  </div>
                  <p className="mt-1.5 text-sm text-muted">{t.tagline}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {t.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-[14.5px] leading-snug text-ink-soft">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#5be2a1] to-[#00a76d] text-white">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink href="/contact" variant={t.marquee ? "primary" : "secondary"} className="mt-7 w-full">
                    Inquire
                  </ButtonLink>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Current sponsors */}
      {sponsors.length > 0 && (
        <section className="bg-brand-50/40 py-20 sm:py-24">
          <Container>
            <SectionHeader align="center" eyebrow="In good company" title="The partners behind the Village" />
            <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sponsors.map((s) => (
                <StaggerItem key={s.name}>
                  <div className="card-glass card-glass-lift flex h-full items-center gap-4 rounded-2xl p-6">
                    <GradientAvatar name={s.name} hue={s.hue} className="h-14 w-14 rounded-xl text-base" rounded="rounded-xl" />
                    <div>
                      <h3 className="font-display text-lg font-semibold text-brand-900">{s.name}</h3>
                      <div className="mt-1"><Badge tone={tierTone[s.tier] ?? "neutral"}>{s.tier} Sponsor</Badge></div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>
      )}

      {/* CTA — editorial, not centered */}
      <section className="py-24 sm:py-28">
        <Container>
          <Reveal>
            <div
              className="relative overflow-hidden rounded-[2.5rem] px-8 py-14 sm:px-14"
              style={{ background: "linear-gradient(120deg, #001d16 0%, #00563f 55%, #0a6b4e 100%)" }}
            >
              <div className="absolute inset-0 bg-grid opacity-[0.12]" />
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald/20 blur-3xl" />
              <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                <div className="max-w-xl">
                  <Eyebrow tone="dark">Let&apos;s talk</Eyebrow>
                  <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white text-balance">Become a Toluca Lake sponsor</h2>
                  <p className="mt-4 text-lg leading-relaxed text-white/85">
                    Tell us your goals and we&apos;ll build a package that fits. Reach us at{" "}
                    <a href={`mailto:${site.email}`} className="font-semibold text-white underline-offset-4 hover:underline">{site.email}</a>{" "}
                    or <a href={site.phoneHref} className="font-semibold text-white underline-offset-4 hover:underline">{site.phone}</a>.
                  </p>
                </div>
                <ButtonLink href="/contact" size="lg" className="shrink-0">
                  Start a conversation <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
