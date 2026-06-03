import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { PlanCard } from "@/components/cards/plan-card";
import { getPlans } from "@/server/queries";

export const metadata: Metadata = {
  title: "Membership Plans & Pricing",
  description:
    "Businesses and residents are welcome. You do not need to be located in Toluca Lake.",
};

export const dynamic = "force-dynamic";

export default async function MembershipPage() {
  const plans = await getPlans();
  return (
    <>
      <PageHero
        eyebrow="Join the Chamber"
        image="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1900&q=80"
        title="Membership for every kind of neighbor"
        description="Joining the Toluca Lake Chamber of Commerce is an opportunity to become part of one of Los Angeles' most connected and community-driven business networks. Membership is open to businesses, professionals, and residents."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Membership" }]}
      />

      <section className="section relative isolate">
        <div className="aurora aurora-a h-[420px] w-[420px] -top-20 left-1/3 opacity-25" />
        <Container className="relative">
          <SectionHeader align="center" eyebrow="Choose your plan" title={<>Find one that <span className="text-gradient-spring display-italic">works</span> for you</>} />
          <Stagger className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((p) => (
              <StaggerItem key={p.key}><PlanCard plan={p} /></StaggerItem>
            ))}
          </Stagger>

          <div className="card-glass mx-auto mt-14 max-w-3xl rounded-3xl p-7 text-sm leading-relaxed text-ink-soft">
            <p>
              <strong className="text-brand-800">Please note:</strong> Membership is subject to
              review and approval at the discretion of the not-for-profit board of advisors.
              Tiers and benefits may change with notice. If you are not approved, you will
              receive a full refund.
            </p>
          </div>

          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            <p className="text-muted">Not sure which plan fits? We are happy to help.</p>
            <Link href="/membership/benefits" className="inline-flex items-center gap-1.5 font-semibold text-brand-700 transition-all hover:gap-2.5 hover:text-brand-800">
              Compare all benefits <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
