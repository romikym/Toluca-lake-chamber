import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { GradientCover } from "@/components/ui/gradient";
import { Badge } from "@/components/ui/badge";
import { getArticles } from "@/server/queries";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Community Spotlight",
  description:
    "Toluca Lake Spotlight shines a light on the people, places, and businesses that make our community unique.",
};

export const dynamic = "force-dynamic";

export default async function SpotlightPage() {
  const spotlightArticles = await getArticles();
  return (
    <>
      <PageHero
        eyebrow="Community Spotlight"
        title="The people and places that make us unique"
        description="Toluca Lake Spotlight shines a light on the people, places, and businesses at the heart of the Village."
        hue={148}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Spotlight" }]}
      />

      <section className="py-20">
        <Container>
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {spotlightArticles.map((a) => (
              <StaggerItem key={a.slug}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <GradientCover name={a.title} hue={a.hue} className="h-44">
                    <div className="absolute bottom-3 left-3">
                      <Badge tone="neutral" className="bg-white/90">Spotlight</Badge>
                    </div>
                  </GradientCover>
                  <div className="flex flex-1 flex-col p-5">
                    <time className="text-xs font-medium text-brand-500">{formatDate(a.date)}</time>
                    <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-brand-900">{a.title}</h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">{a.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
                      Read more <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}
