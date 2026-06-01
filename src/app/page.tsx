import Link from "next/link";
import {
  ArrowRight, Users, CalendarDays, Clock, Tag, TrendingUp, Network,
  Megaphone, ShieldCheck, MapPin,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { getEvents, getCategories } from "@/server/queries";

export const dynamic = "force-dynamic";

/* Layered photo backgrounds: a real photo (drop into /public/images) sits on top
   of a tasteful green-scene gradient that shows if the photo isn't present yet. */
const heroPhoto: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(180deg, rgba(0,28,19,0) 50%, rgba(0,28,19,0.55) 100%)," +
    "url('/images/hero-toluca-lake.jpg')," +
    "linear-gradient(165deg, #cfe7d6 0%, #8fbf9f 24%, #4f9e7e 46%, #1d7a59 64%, #00563f 82%, #003726 100%)",
  backgroundSize: "cover, cover, cover",
  backgroundPosition: "center, center, center",
  backgroundRepeat: "no-repeat",
};

function eventCover(hue: number, slug: string): React.CSSProperties {
  return {
    backgroundImage:
      `url('/images/events/${slug}.jpg'),` +
      `linear-gradient(150deg, hsl(${hue} 32% 52%), hsl(${hue} 42% 28%))`,
    backgroundSize: "cover, cover",
    backgroundPosition: "center, center",
    backgroundRepeat: "no-repeat",
  };
}

const mission = [
  { icon: TrendingUp, title: "Grow", body: "Strategic programs and advocacy that support local business and sustainable growth." },
  { icon: Network, title: "Connect", body: "Networking events and community gatherings that build relationships and opportunity." },
  { icon: Megaphone, title: "Promote", body: "Marketing exposure and visibility that showcases our members and the Village." },
  { icon: ShieldCheck, title: "Protect", body: "Advocacy and leadership that protect our local voice and the future of our community." },
];

const programLabel = (slug: string) =>
  slug.includes("network") || slug.includes("mixer") ? "Networking"
  : slug.includes("clean") ? "Community"
  : slug.includes("howl") || slug.includes("holiday") || slug.includes("breakfast") ? "Community"
  : slug.includes("art") || slug.includes("health") ? "Community"
  : "Community";

export default async function HomePage() {
  const [events, categories] = await Promise.all([
    getEvents(), getCategories(),
  ]);
  const featuredEvents = events.slice(0, 3);

  const stats = [
    { icon: Users, value: "120+", label: "Member Businesses" },
    { icon: CalendarDays, value: "40+", label: "Community Events Each Year" },
    { icon: Clock, value: `${new Date().getFullYear() - 1939}`, label: "Years Serving the Village" },
    { icon: Tag, value: `${categories.length || 14}`, label: "Industry Categories" },
  ];

  return (
    <>
      {/* ============================= HERO ============================= */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        {/* Deep green gradient field */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 18% 20%, #0a6b4e 0%, rgba(10,107,78,0) 55%)," +
              "linear-gradient(135deg, #003726 0%, #00301f 55%, #001c13 100%)",
          }}
        />
        <div className="absolute inset-0 bg-grid opacity-[0.12]" />
        {/* Botanical accents */}
        <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-emerald/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-spring/10 blur-3xl" />
        {/* Large organic arc behind the photo */}
        <div className="absolute -right-40 -top-24 hidden h-[680px] w-[680px] rounded-full border border-white/10 lg:block" />

        {/* Photo panel — bleeds to the right edge with an organic curved left side */}
        <div className="absolute inset-y-0 right-0 hidden w-[58%] lg:block">
          <div
            className="absolute inset-0 my-8 mr-6 rounded-[2.75rem] shadow-luxe"
            style={{ ...heroPhoto, clipPath: "ellipse(128% 92% at 82% 46%)" }}
          />
          {/* glass curved highlight along the boundary */}
          <div
            className="absolute inset-0 my-8 mr-6 rounded-[2.75rem] ring-1 ring-inset ring-white/15"
            style={{ clipPath: "ellipse(128% 92% at 82% 46%)" }}
          />
          {/* floating glass chip on the photo */}
          <div className="glass luxe-edge absolute bottom-16 left-16 flex items-center gap-3 rounded-2xl px-4 py-3 text-brand-900 shadow-glass">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-white"><MapPin className="h-4 w-4" /></span>
            <div className="text-left">
              <p className="text-xs text-muted">The Village</p>
              <p className="text-sm font-semibold">Toluca Lake, California</p>
            </div>
          </div>
        </div>

        <Container className="relative">
          <div className="grid items-center gap-10 py-16 sm:py-20 lg:min-h-[78vh] lg:grid-cols-2 lg:py-24">
            <div className="max-w-xl">
              <Reveal>
                <span className="glass inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-spring" />
                  Serving Toluca Lake since 1939
                </span>
              </Reveal>
              <Reveal delay={0.06}>
                <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.04] text-white sm:text-6xl">
                  The village business community,{" "}
                  <span className="display-italic text-gradient-spring">elevated.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-white/80">
                  Connecting Toluca Lake businesses, residents, and leaders through
                  advocacy, events, and meaningful local relationships.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <ButtonLink href="/membership/apply" size="lg" className="glow-emerald">
                    Join the Chamber <ArrowRight className="h-4 w-4" />
                  </ButtonLink>
                  <Link
                    href="/directory"
                    className="inline-flex h-[52px] items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 text-[15px] font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
                  >
                    Explore Members <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Mobile / tablet photo */}
            <div className="lg:hidden">
              <div
                className="aspect-[4/3] w-full rounded-[2rem] shadow-luxe"
                style={heroPhoto}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ====================== FLOATING STATS CARD ====================== */}
      <section className="relative z-10 -mt-14 sm:-mt-20">
        <Container>
          <Reveal>
            <div className="mx-auto grid max-w-[85rem] grid-cols-2 gap-y-8 rounded-[2rem] border border-line bg-surface px-6 py-9 shadow-luxe sm:px-10 lg:grid-cols-4 lg:divide-x lg:divide-line">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col items-center px-4 text-center lg:px-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-white shadow-[0_8px_20px_-6px_rgba(0,167,109,0.5)]">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div className="mt-4 font-display text-4xl font-semibold text-brand-700 sm:text-5xl">{s.value}</div>
                  <div className="mt-2 max-w-[10rem] text-sm leading-snug text-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ============================ MISSION ============================ */}
      <section className="py-24 sm:py-28">
        <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">Our Mission</span>
            <h2 className="mt-5 max-w-md font-display text-4xl font-semibold leading-[1.1] text-brand-900 sm:text-[2.75rem]">
              A driving force behind our community&rsquo;s{" "}
              <span className="display-italic text-gradient-spring">vitality.</span>
            </h2>
            <div className="mt-6 max-w-md space-y-4 text-[15px] leading-relaxed text-ink-soft">
              <p>
                Since 1939, the Toluca Lake Chamber of Commerce has brought together local
                businesses, residents, and community leaders to support the neighborhood we
                all care about.
              </p>
              <p>
                From local events and business networking to community partnerships and
                advocacy, the Chamber plays an active role in preserving the character of
                Toluca Lake while helping it continue to grow and thrive.
              </p>
            </div>
            <Link href="/about" className="mt-7 inline-flex items-center gap-2 border-b border-brand-300 pb-0.5 text-sm font-medium text-brand-700 transition hover:gap-3 hover:border-brand-500">
              Learn more about us <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <Stagger className="grid gap-5 sm:grid-cols-2">
            {mission.map((m) => (
              <StaggerItem key={m.title}>
                <div className="group h-full rounded-3xl border border-line bg-surface p-6 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-lg">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-emerald text-white shadow-[0_10px_24px_-8px_rgba(0,167,109,0.5)]">
                    <m.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-brand-900">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{m.body}</p>
                  <ArrowRight className="mt-5 h-4 w-4 text-brand-300 transition-all group-hover:translate-x-1 group-hover:text-emerald" />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ============================ EVENTS ============================ */}
      {featuredEvents.length > 0 && (
        <section className="pb-24 sm:pb-28">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <Reveal>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">Upcoming Events</span>
                <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.1] text-brand-900">
                  Bringing people together.<br />
                  <span className="display-italic text-gradient-spring">Creating impact.</span>
                </h2>
              </Reveal>
              <Link href="/events" className="inline-flex items-center gap-2 border-b border-brand-300 pb-0.5 text-sm font-medium text-brand-700 transition hover:gap-3 hover:border-brand-500">
                View all events <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredEvents.map((e) => {
                const d = new Date(e.start);
                const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
                const day = d.getDate();
                const time = d.toLocaleString("en-US", { hour: "numeric", minute: "2-digit" });
                const end = e.end ? new Date(e.end).toLocaleString("en-US", { hour: "numeric", minute: "2-digit" }) : null;
                return (
                  <StaggerItem key={e.slug}>
                    <Link
                      href={`/events/${e.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-lg"
                    >
                      <div className="relative h-44" style={eventCover(e.hue, e.slug)}>
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/25 to-transparent" />
                        <div className="absolute left-4 top-4 flex flex-col items-center rounded-2xl bg-white/95 px-3 py-1.5 shadow-md">
                          <span className="text-[10px] font-semibold tracking-wide text-emerald">{month}</span>
                          <span className="font-display text-xl font-semibold leading-none text-brand-900">{day}</span>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald">{programLabel(e.program || e.slug)}</span>
                        <h3 className="mt-1.5 font-display text-lg font-semibold text-brand-900">{e.title}</h3>
                        <div className="mt-3 space-y-1.5 text-sm text-muted">
                          <p className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> {time}{end ? ` – ${end}` : ""}</p>
                          <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {e.location}</p>
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </Container>
        </section>
      )}

      {/* =========================== CTA BAND =========================== */}
      <section className="pb-24 sm:pb-28">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] px-8 py-12 shadow-luxe sm:px-14 sm:py-16" style={{ background: "linear-gradient(120deg, #003726 0%, #00563f 55%, #0a6b4e 100%)" }}>
              <div className="absolute inset-0 bg-grid opacity-[0.12]" />
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald/20 blur-3xl" />
              <div className="relative flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
                <div className="flex items-center gap-5">
                  <span className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-full border border-white/25 bg-white/10 text-white">
                    <span className="text-[10px] font-semibold tracking-widest">19</span>
                    <span className="my-0.5 h-3 w-3 rounded-full bg-white/80" />
                    <span className="text-[10px] font-semibold tracking-widest">39</span>
                  </span>
                  <h2 className="font-display text-3xl font-semibold leading-[1.12] text-white sm:text-4xl">
                    Stronger together.<br />
                    Better for <span className="display-italic text-gradient-spring">Toluca Lake.</span>
                  </h2>
                </div>
                <ButtonLink href="/membership/apply" size="lg" variant="glass" className="shrink-0">
                  Join the Chamber <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
