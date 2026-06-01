import Link from "next/link";
import {
  ArrowRight, Sparkles, Quote, Network, Megaphone, Store, Users,
  Calendar, ShieldCheck, TrendingUp,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeader, Eyebrow } from "@/components/ui/section-header";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { Icon } from "@/components/ui/icon";
import { GradientAvatar, gradientStyle } from "@/components/ui/gradient";
import { BusinessCard } from "@/components/cards/business-card";
import { EventCard } from "@/components/cards/event-card";
import { testimonials, impactStats } from "@/lib/data";
import { getBusinesses, getEvents, getPrograms } from "@/server/queries";

const benefits = [
  { icon: Store, title: "Directory presence", body: "A rich profile with photo gallery that puts your business in front of the whole Village." },
  { icon: Network, title: "Real connections", body: "Members-only mixers and events that turn neighbors into customers and collaborators." },
  { icon: Megaphone, title: "Marketing exposure", body: "Features across our social platforms, newsletter, and the Toluca Lake Magazine." },
  { icon: ShieldCheck, title: "Advocacy", body: "A unified voice working to strengthen the local economy and protect what makes the Village special." },
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [businesses, events, programs] = await Promise.all([
    getBusinesses(), getEvents(), getPrograms(),
  ]);
  const featuredEvents = events.slice(0, 3);
  const featuredMembers = businesses.filter((b) => b.tier !== "STANDARD").slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={gradientStyle(150)} />
        <div className="absolute inset-0 -z-10 bg-grid opacity-20" />
        <div className="animate-float-slow absolute -left-24 top-24 -z-10 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl" />
        <div className="animate-float-slower absolute -right-16 -top-10 -z-10 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-white/10" />

        <Container className="relative grid gap-10 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <Reveal>
              <Badge tone="brand" className="bg-white/80">
                <Sparkles className="h-3.5 w-3.5" /> Serving the Village since 1939
              </Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.03] text-white sm:text-[4rem] text-balance">
                Empowering local business in Toluca Lake
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
                Resources, networking, and advocacy for the businesses and residents who
                make our community thrive. Join us — and let&apos;s grow the Village together.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/membership/apply" size="lg" variant="glass">
                  Join the Chamber <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/directory" size="lg" variant="secondary" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                  Explore the Directory
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Glass stat card */}
          <div className="lg:col-span-5">
            <Reveal delay={0.2} className="h-full">
              <div className="glass luxe-edge h-full rounded-3xl p-6 shadow-luxe">
                <p className="font-display text-sm font-semibold text-brand-800">Community at a glance</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {impactStats.map((s) => (
                    <div key={s.label} className="luxe-edge rounded-2xl bg-white/70 p-4 transition-transform duration-300 hover:-translate-y-0.5">
                      <div className="font-display text-3xl font-bold text-brand-700">
                        <Counter value={s.value} suffix={s.suffix ?? ""} />
                      </div>
                      <div className="mt-1 text-xs text-muted">{s.label}</div>
                    </div>
                  ))}
                </div>
                <Link href="/about" className="mt-4 flex items-center justify-between rounded-2xl bg-brand-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-brand-800">
                  Our story & mission <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* MISSION */}
      <section className="py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <SectionHeader
            eyebrow="Our mission"
            title="A driving force behind the community's vitality"
            description="Since 1939, the Toluca Lake Chamber of Commerce has helped bring together local businesses, residents, and community leaders to support the neighborhood we all care about. From local events and business networking to community partnerships and advocacy, the Chamber plays an active role in preserving the character of Toluca Lake while helping it continue to grow and thrive."
          />
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: TrendingUp, k: "Grow", v: "Strategic programs & advocacy" },
                { icon: Users, k: "Connect", v: "Networking & community events" },
                { icon: Store, k: "Promote", v: "Directory & marketing exposure" },
                { icon: ShieldCheck, k: "Protect", v: "A unified local voice" },
              ].map((c) => (
                <div key={c.k} className="group rounded-2xl border border-line bg-surface p-5 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-line-strong hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-3 font-display font-semibold text-brand-900">{c.k}</div>
                  <div className="text-sm text-muted">{c.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* FEATURED EVENTS */}
      <section className="py-12">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <SectionHeader eyebrow="What's happening" title="Upcoming events" />
            <ButtonLink href="/events" variant="tertiary" className="hidden shrink-0 sm:inline-flex">
              All events <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
          <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredEvents.map((e) => (
              <StaggerItem key={e.slug}>
                <EventCard e={e} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* PROGRAMS */}
      <section className="py-16">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Signature programs"
            title="Year-round ways to get involved"
            description="From community traditions and local celebrations to mixers, ribbon cuttings, and neighborhood gatherings, Toluca Lake Chamber events are designed to bring people together — creating the connections and community spirit that make Toluca Lake feel special."
          />
          <Stagger className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <StaggerItem key={p.slug}>
                <Link
                  href={`/events/programs/${p.slug}`}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-line bg-surface p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-brand-900">{p.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">{p.blurb}</p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* FEATURED MEMBERS */}
      <section className="bg-brand-50/60 py-20">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <SectionHeader eyebrow="Member spotlight" title="Featured local businesses" />
            <ButtonLink href="/directory" variant="tertiary" className="hidden shrink-0 sm:inline-flex">
              Browse all 120+ <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
          <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredMembers.map((b) => (
              <StaggerItem key={b.slug}>
                <BusinessCard b={b} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* BENEFITS */}
      <section className="py-20">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Why join"
            title="Membership that pays for itself"
            description="Joining is more than a transaction — it's a relationship with the community that helps your business grow."
          />
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <StaggerItem key={b.title}>
                <div className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-line-strong hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                    <b.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-brand-900">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{b.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-12">
        <Container>
          <Stagger className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <figure className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-line-strong hover:shadow-md">
                  <Quote className="h-7 w-7 text-brand-300" />
                  <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-soft">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <GradientAvatar name={t.name} hue={t.hue} className="h-10 w-10 rounded-full text-xs" rounded="rounded-full" />
                    <div>
                      <div className="text-sm font-semibold text-brand-900">{t.name}</div>
                      <div className="text-xs text-muted">{t.business}</div>
                    </div>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* CTA BAND */}
      <section className="py-16">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl px-8 py-14 text-center sm:px-16" style={gradientStyle(148)}>
              <div className="absolute inset-0 bg-grid opacity-20" />
              <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
              <Eyebrow className="justify-center text-white/80">Ready when you are</Eyebrow>
              <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl text-balance">
                Become part of the Village
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/85">
                Businesses and residents are welcome — you don&apos;t even need to be located in
                Toluca Lake. Join today and start thriving together.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/membership/apply" size="lg" variant="glass">
                  Join the Chamber <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/contact" size="lg" variant="secondary" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                  Get in touch
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
