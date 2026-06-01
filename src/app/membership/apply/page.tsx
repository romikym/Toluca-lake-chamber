import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { JoinForm } from "@/components/forms/join-form";

export const metadata: Metadata = {
  title: "Join the Chamber",
  description: "Apply to become a member of the Toluca Lake Chamber of Commerce in a few quick steps.",
};

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan } = await searchParams;
  return (
    <>
      <PageHero
        eyebrow="Membership application"
        title="Let's get you started"
        description="Choose a plan, tell us about yourself, and you're on your way to joining the Village."
        hue={152}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Membership", href: "/membership" }, { label: "Apply" }]}
      />
      <section className="py-12">
        <Container className="max-w-2xl">
          <JoinForm initialPlan={plan} />
        </Container>
      </section>
    </>
  );
}
