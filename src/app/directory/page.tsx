import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { DirectoryExplorer } from "@/components/directory/directory-explorer";
import { getBusinesses, getCategories } from "@/server/queries";

export const metadata: Metadata = {
  title: "Business Directory",
  description:
    "Explore our network of trusted local businesses and community partners. Search by name, category, or service type.",
};

export const dynamic = "force-dynamic";

export default async function DirectoryPage() {
  const [businesses, categories] = await Promise.all([getBusinesses(), getCategories()]);
  return (
    <>
      <PageHero
        eyebrow="Business directory"
        title="Discover the businesses of the Village"
        description="Discover trusted local businesses, professionals, and community partners that help make Toluca Lake such a vibrant and connected community. Our searchable directory makes it easy to find Chamber members by business type, category, or service — a great place to start supporting local."
        hue={150}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Directory" }]}
      />
      <section className="py-12">
        <Container>
          <DirectoryExplorer businesses={businesses} categories={categories} />
        </Container>
      </section>
    </>
  );
}
