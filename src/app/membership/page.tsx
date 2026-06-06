import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { heroImages } from "@/lib/images";
import { Container } from "@/components/ui/container";
import { SectionHeader, Eyebrow } from "@/components/ui/section-header";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { PlanCard } from "@/components/cards/plan-card";
import { getPlans } from "@/server/queries";

export const metadata: Metadata = {
  title: "Membership Plans & Pricing",
  description:
    "Businesses and residents are welcome. You do not need to be located in Toluca Lake.",
};

export const dynamic = "force-dynamic";

const since = new Date().getFullYear() - 1939;

export default async function MembershipPage() {
  const plans = await getPlans();
  return (
    <>
      <PageHero
        eyebrow="Join the Chamber"
        image={heroImages.membership}
        title="Membership that pays for itself"
        description="More customers, real connections, marketing exposure, and a unified voice — for businesses, professionals, and residents alike."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Membership" }]}
      />

      <section className="section relative isolate">
        <div className="aurora aurora-a h-[420px] w-[420px] -top-20 left-1/3 opacity-25" />
        <Container className="relative">
          <SectionHeader
            align="center"
            eyebrow="Choose your plan"
            title={<>Find one that <span className="text-gradient-spring display-italic">works</span> for you</>}
            description={`Open to everyone — you don't need to be located in Toluca Lake. Backed by a community that has served the Village for ${since} years.`}
          />

          <Stagger className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((p) => (
              <StaggerItem key={p.key}><PlanCard plan={p} /></StaggerItem>
            ))}
          </Stagger>

          {/* Zero-risk guarantee — prominent, not a buried disclaimer */}
          <Reveal className="mx-auto mt-14 max-w-3xl">
            <div className="flex flex-col items-start gap-5 rounded-[1.75rem] border border-brand-100 bg-gradient-to-br from-brand-50/80 to-transparent p-8 sm:flex-row sm:items-center">
              <span className="icon-emerald flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-emerald-soft">
                <ShieldCheck className="h-7 w-7" strokeWidth={1.75} />
              </span>
              <div>
                <p className="font-display text-xl font-semibold text-brand-900">Apply with zero risk</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">
                  Every application is reviewed by our volunteer board of advisors. You&apos;re never
                  charged until you&apos;re approved — and if you&apos;re not, you receive a full refund.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 text-center">
            <Link href="/membership/benefits" className="link-arrow text-[15px]">
              See everything you get <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="pb-24 sm:pb-28">
        <Container>
          <Reveal>
            <div
              className="relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center sm:px-16"
              style={{ background: "linear-gradient(120deg, #001d16 0%, #00563f 55%, #0a6b4e 100%)" }}
            >
              <div className="absolute inset-0 bg-grid opacity-[0.12]" />
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald/20 blur-3xl" />
              <div className="relative">
                <Eyebrow tone="dark" className="justify-center">Open to everyone</Eyebrow>
                <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.08] text-white sm:text-5xl text-balance">
                  Become part of the Village
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/85">
                  Join the network that has strengthened Toluca Lake for {since} years. Approval is
                  simple, and your first impression starts the moment you&apos;re in.
                </p>
                <div className="mt-9 flex flex-wrap justify-center gap-3">
                  <ButtonLink href="/membership/apply" size="lg">
                    Join the Chamber <ArrowRight className="h-4 w-4" />
                  </ButtonLink>
                  <ButtonLink href="/contact" size="lg" variant="glass-dark">
                    Ask a question
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
