import type { Metadata } from "next";
import { Check, Store, Megaphone, Users, BookOpen, Scissors, Tag, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Member Benefits",
  description:
    "Directory exposure, social reach, members-only mixers, a free Toluca Lake Magazine subscription, and more.",
};

const benefits = [
  { icon: Store, title: "Directory profile", body: "A complete listing with photo gallery and a full description of your business — an additional online presence that works for you 24/7." },
  { icon: Megaphone, title: "Social media exposure", body: "Virtually unlimited exposure across our Facebook and Instagram platforms to thousands of engaged locals." },
  { icon: BookOpen, title: "Toluca Lake Magazine", body: "A free subscription to the Toluca Lake Magazine, keeping you connected to the community." },
  { icon: Scissors, title: "Grand-opening support", body: "Ribbon-cutting and grand-opening invitations that put a spotlight on your milestones." },
  { icon: Tag, title: "Advertising opportunities", body: "Access to special advertising opportunities reserved for Chamber members." },
  { icon: Users, title: "Members-only mixers", body: "Private mixers where relationships — and referrals — are built over good company." },
];

export default function BenefitsPage() {
  return (
    <>
      <PageHero
        eyebrow="Why join"
        title="More than a membership — a relationship"
        description="Joining the Chamber is about building a relationship with our community. Here's what comes with it."
        hue={145}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Membership", href: "/membership" }, { label: "Benefits" }]}
      />

      <section className="py-16">
        <Container>
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <StaggerItem key={b.title}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
                    <b.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-brand-900">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{b.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl border border-line bg-brand-50/60 p-10 text-center">
            <SectionHeader align="center" title="Ready to join the Village?" />
            <ButtonLink href="/membership/apply" size="lg">
              Become a member <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
