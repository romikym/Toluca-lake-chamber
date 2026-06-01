import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
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
  return (
    <>
      <PageHero
        eyebrow="What's happening"
        title="Events that bring the Village together"
        description="Network, promote your business, or simply stay engaged. Some events are members-only or require reservations — check each listing for details."
        hue={165}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Events" }]}
      />
      <section className="py-12">
        <Container>
          <EventsBrowser events={events} programs={programs} />
        </Container>
      </section>
    </>
  );
}
