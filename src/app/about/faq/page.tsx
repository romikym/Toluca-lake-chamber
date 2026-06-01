import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { getFaqs } from "@/server/queries";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Quick, clear answers about membership with the Toluca Lake Chamber of Commerce — joining, dues, renewals, and benefits.",
};

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const faqs = await getFaqs();
  return (
    <>
      <PageHero
        eyebrow="Help center"
        title="Frequently asked questions"
        description="Have questions about Chamber membership, events, sponsorships, or getting involved in the community? Our FAQ covers the most common questions about the Toluca Lake Chamber of Commerce — including membership benefits, account access, event participation, and more."
        hue={160}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "FAQ" }]}
      />

      <section className="py-20">
        <Container className="max-w-3xl">
          <Reveal>
            <Accordion items={faqs} />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-line bg-brand-50/60 p-8 text-center">
              <h2 className="font-display text-xl font-semibold text-brand-900">Still have questions?</h2>
              <p className="max-w-md text-sm text-ink-soft">
                Our team is happy to help you find the right membership and answer anything
                about the Chamber.
              </p>
              <ButtonLink href="/contact">
                Contact us <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
