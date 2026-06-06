import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarOff } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { EventCard } from "@/components/cards/event-card";
import { Icon } from "@/components/ui/icon";
import { getProgram, getEventsForProgram } from "@/server/queries";

// Rendered on demand so unknown program slugs return a true 404.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProgram(slug);
  if (!p) notFound();
  return { title: p.name, description: p.blurb };
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = await getProgram(slug);
  if (!program) notFound();
  const upcoming = await getEventsForProgram(slug);

  return (
    <>
      <PageHero
        eyebrow="Signature program"
        title={program.name}
        description={program.blurb}
        hue={155}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Events", href: "/events" }, { label: program.name }]}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
          <Icon name={program.icon} className="h-7 w-7" />
        </div>
      </PageHero>

      <section className="py-16">
        <Container>
          <h2 className="mb-8 font-display text-2xl font-semibold text-brand-900">Upcoming {program.name} events</h2>
          {upcoming.length > 0 ? (
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((e) => (
                <StaggerItem key={e.slug}><EventCard e={e} /></StaggerItem>
              ))}
            </Stagger>
          ) : (
            <div className="rounded-2xl border border-dashed border-line bg-surface p-12 text-center">
              <CalendarOff className="mx-auto h-8 w-8 text-faint" />
              <p className="mt-3 font-display text-lg font-semibold text-brand-900">No dates scheduled yet</p>
              <p className="mt-1 text-sm text-muted">Check back soon or subscribe to our newsletter for updates.</p>
            </div>
          )}
          <Link href="/events" className="mt-10 inline-flex items-center gap-2 text-sm text-brand-600 hover:gap-2.5">
            <ArrowLeft className="h-4 w-4" /> All events
          </Link>
        </Container>
      </section>
    </>
  );
}
