import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { PlanCard } from "@/components/cards/plan-card";
import { getPlans } from "@/server/queries";

export const metadata: Metadata = {
  title: "Membership Plans & Pricing",
  description:
    "Businesses and residents are welcome — you don't need to be located in Toluca Lake. Choose the membership that works for you.",
};

export const dynamic = "force-dynamic";

export default async function MembershipPage() {
  const plans = await getPlans();
  return (
    <>
      <PageHero
        eyebrow="Join the Chamber"
        title="Membership for every kind of neighbor"
        description="Joining the Toluca Lake Chamber of Commerce is an opportunity to become part of one of Los Angeles' most connected and community-driven business networks. Membership is open to businesses, professionals, and residents — and you do not need to be located directly in Toluca Lake to join."
        hue={150}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Membership" }]}
      />

      <section className="py-16">
        <Container>
          <SectionHeader align="center" eyebrow="Choose your plan" title="Find one that works for you" />
          <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((p) => (
              <StaggerItem key={p.key}><PlanCard plan={p} /></StaggerItem>
            ))}
          </Stagger>

          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-line bg-brand-50/60 p-6 text-sm leading-relaxed text-ink-soft">
            <p>
              <strong className="text-brand-800">Please note:</strong> Membership is subject to
              review and approval at the discretion of the not-for-profit board of advisors.
              Tiers and benefits may change with notice. If you are not approved, you&apos;ll
              receive a full refund.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            <p className="text-muted">Not sure which plan fits? We&apos;re happy to help.</p>
            <Link href="/membership/benefits" className="inline-flex items-center gap-1 font-medium text-brand-600 hover:gap-1.5">
              Compare all benefits <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
