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
        size="tall"
        image="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1900&q=80"
        title="Discover the businesses of the Village"
        description="Trusted local businesses, professionals, and community partners — the people who make Toluca Lake feel like a town all its own. Search by name, category, or service, and start shopping local."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Directory" }]}
      >
        <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-sm text-white/80">
          <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-spring" /> {businesses.length || "120"}+ member businesses</span>
          <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-spring" /> {categories.length} categories</span>
          <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-spring" /> One square mile, fully local</span>
        </div>
      </PageHero>
      <section className="py-12">
        <Container>
          <DirectoryExplorer businesses={businesses} categories={categories} />
        </Container>
      </section>
    </>
  );
}
