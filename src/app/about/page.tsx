import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users, ScrollText, Sparkles, HelpCircle } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The Toluca Lake Chamber of Commerce was formed in 1939 to preserve and enhance the economic climate of the Toluca Lake community.",
};

const links = [
  { href: "/about/board", icon: Users, title: "Meet the Board", body: "The volunteer leaders who power the Chamber." },
  { href: "/about/legacy", icon: ScrollText, title: "The Toluca Lake Legacy", body: "A history of the Village, from the Tongva to today." },
  { href: "/about/spotlight", icon: Sparkles, title: "Community Spotlight", body: "The people and places that make us unique." },
  { href: "/about/faq", icon: HelpCircle, title: "FAQ", body: "Everything you need to know about membership." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Chamber"
        title="Preserving and enhancing the Village we love"
        description="Formed in 1939, the Toluca Lake Chamber of Commerce works to strengthen the competitive economic climate of our community."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section className="section relative isolate">
        <div className="aurora aurora-c h-[360px] w-[360px] -top-20 -right-20 opacity-30" />
        <Container className="relative grid gap-14 lg:grid-cols-2 lg:gap-20">
          <SectionHeader
            eyebrow="Our mission"
            title={<>Built for businesses <span className="text-gradient-spring display-italic">and</span> residents alike</>}
            description="Since 1939, the Toluca Lake Chamber of Commerce has worked to support the local businesses, community relationships, and neighborhood character that make Toluca Lake unique."
          />
          <Reveal delay={0.1} className="space-y-5 text-[15px] leading-relaxed text-ink-soft">
            <p>
              What began as a small group of local business and community leaders has
              grown into an active organization dedicated to bringing people together,
              supporting local initiatives, and helping the neighborhood continue to thrive.
            </p>
            <p>
              Through events, partnerships, advocacy, and community engagement, the Chamber
              plays an ongoing role in strengthening connections between businesses,
              residents, and the broader Toluca Lake community.
            </p>
            <ButtonLink href="/membership" variant="secondary">
              Explore membership <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <Stagger className="grid gap-6 sm:grid-cols-2">
            {links.map((l) => (
              <StaggerItem key={l.href}>
                <Link
                  href={l.href}
                  className="card-glass card-glass-lift group flex items-start gap-5 rounded-3xl p-7"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5be2a1] to-[#00a76d] text-white shadow-emerald-soft transition-transform duration-500 group-hover:scale-110">
                    <l.icon className="h-6 w-6" strokeWidth={2.2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="flex items-center gap-1 font-display text-xl font-semibold text-brand-900">
                      {l.title}
                      <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">{l.body}</p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}
