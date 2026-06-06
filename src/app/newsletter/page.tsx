import type { Metadata } from "next";
import { ArrowUpRight, Mail, Check } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { heroImages } from "@/lib/images";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { GradientCover } from "@/components/ui/gradient";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { newsletterIssues } from "@/lib/newsletter";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "The Village in your inbox — community news, member spotlights, and the events worth showing up for. Read the archive and subscribe.",
};

const promises = [
  "Community news & advocacy updates",
  "Member spotlights & shop-local picks",
  "Every event worth showing up for",
];

export default function NewsletterPage() {
  const [latest, ...rest] = newsletterIssues;

  return (
    <>
      <PageHero
        eyebrow="Stay connected"
        image={heroImages.newsletter}
        title="The Village, in your inbox"
        description="Once a month, never more — community news, member spotlights, and the gatherings that bring Toluca Lake together."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Community" }, { label: "Newsletter" }]}
      />

      {/* Subscribe — the primary action, up top */}
      <section className="section">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-brand-900 sm:text-4xl text-balance">
              Join the list
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
              Thousands of neighbors and business owners start their month with the Chamber newsletter. It&apos;s free, and you can unsubscribe anytime.
            </p>
            <ul className="mt-7 space-y-3">
              {promises.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[15px] text-ink-soft">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#5be2a1] to-[#00a76d] text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="card-glass rounded-[1.75rem] p-7 sm:p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5be2a1] to-[#00a76d] text-white shadow-emerald-soft">
                <Mail className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-brand-900">Subscribe free</h3>
              <p className="mt-1.5 text-sm text-ink-soft">The next issue lands in your inbox.</p>
              <div className="mt-5">
                <NewsletterForm />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Latest issue — featured */}
      <section className="pb-6">
        <Container>
          <SectionHeader eyebrow="Latest issue" title="Hot off the press" />
          <Reveal className="mt-10">
            <a
              href={latest.url ?? "#"}
              className="group grid overflow-hidden rounded-[2rem] border border-line bg-surface shadow-sm transition-all duration-300 hover:shadow-lg md:grid-cols-2"
            >
              <GradientCover name={latest.title} hue={latest.hue} className="min-h-[240px] md:min-h-full">
                <div className="absolute bottom-5 left-6 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
                  {latest.season}
                </div>
              </GradientCover>
              <div className="p-8 sm:p-10">
                <span className="text-sm font-medium text-muted">
                  {new Date(latest.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
                <h3 className="mt-3 font-display text-2xl font-semibold leading-snug text-brand-900 sm:text-3xl">
                  {latest.title}
                </h3>
                <p className="mt-4 leading-relaxed text-ink-soft">{latest.excerpt}</p>
                <ul className="mt-5 space-y-2">
                  {latest.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2.5 text-sm text-ink-soft">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                      {h}
                    </li>
                  ))}
                </ul>
                <span className="link-arrow mt-7 inline-flex items-center gap-1.5 font-semibold text-brand-700">
                  Read this issue <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </a>
          </Reveal>
        </Container>
      </section>

      {/* Archive */}
      <section className="section">
        <Container>
          <SectionHeader eyebrow="The archive" title="Past issues" description="Catch up on everything happening in the Village." />
          <Stagger className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((n) => (
              <StaggerItem key={n.slug}>
                <a
                  href={n.url ?? "#"}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <GradientCover name={n.title} hue={n.hue} className="h-40">
                    <div className="absolute bottom-4 left-5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                      {n.season}
                    </div>
                  </GradientCover>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-medium text-muted">
                      {new Date(n.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-brand-900">{n.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{n.excerpt}</p>
                    <span className="link-arrow mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                      Read issue <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}
