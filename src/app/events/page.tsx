import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { heroImages } from "@/lib/images";
import { Container } from "@/components/ui/container";
import { EventsBrowser } from "@/components/events/events-browser";
import { getEvents, getPrograms } from "@/server/queries";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Stay informed about upcoming Toluca Lake Chamber events — networking mixers, community celebrations, and ways to grow your business.",
};

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const [events, programs] = await Promise.all([getEvents(), getPrograms()]);
  const next = events.find((e) => new Date(e.start) >= new Date()) ?? events[0];
  const nextWhen = next
    ? new Date(next.start).toLocaleDateString("en-US", { month: "long", day: "numeric" })
    : null;
  return (
    <>
      <PageHero
        eyebrow="What's happening"
        size="tall"
        image={heroImages.events}
        title="Events that bring the Village together"
        description="Network, promote your business, or simply show up for your neighbors. Some events are members-only or need a reservation — check each listing for details."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Events" }]}
      >
        {next && (
          <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm text-white backdrop-blur">
            <span className="rounded-full bg-spring/90 px-2.5 py-0.5 text-xs font-bold text-brand-950">NEXT</span>
            <span className="font-medium">{next.title}</span>
            {nextWhen && <span className="text-white/60">·&nbsp;{nextWhen}</span>}
          </div>
        )}
      </PageHero>
      <section className="py-12">
        <Container>
          <EventsBrowser events={events} programs={programs} />
        </Container>
      </section>
    </>
  );
}
