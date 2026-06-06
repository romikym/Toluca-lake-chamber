import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowLeft, Share2, Tag } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { GradientCover, gradientStyle } from "@/components/ui/gradient";
import { Reveal } from "@/components/ui/reveal";
import { RegistrationPanel } from "@/components/events/registration-panel";
import { getEvent, getProgram } from "@/server/queries";
import { formatDate } from "@/lib/utils";

// Rendered on demand from the database so content stays fresh and unknown slugs
// return a true 404 (avoids the SSG soft-404 where notFound() resolved as 200).
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = await getEvent(slug);
  if (!e) return { title: "Event not found" };
  return { title: e.title, description: e.summary };
}

export default async function EventDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = await getEvent(slug);
  if (!e) notFound();
  const program = e.program ? await getProgram(e.program) : null;
  const date = new Date(e.start);
  const time = date.toLocaleString("en-US", { hour: "numeric", minute: "2-digit" });
  const endTime = e.end ? new Date(e.end).toLocaleString("en-US", { hour: "numeric", minute: "2-digit" }) : null;

  return (
    <>
      <GradientCover name={e.title} hue={e.hue} className="h-52 sm:h-64">
        <Container className="relative flex h-full flex-col justify-end pb-6">
          <div className="flex gap-2">
            {program && <Badge tone="neutral" className="bg-white/90">{program.name}</Badge>}
            {e.price === 0 ? <Badge tone="brand" className="bg-white/90">Free</Badge> : null}
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">{e.title}</h1>
          <div aria-hidden className="mt-4 h-px w-16 rounded-full" style={{ background: "linear-gradient(90deg, var(--color-gold-bright), var(--color-copper) 60%, transparent)" }} />
        </Container>
      </GradientCover>

      <Container className="grid gap-10 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Reveal>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2 text-brand-700">
                <Calendar className="h-4 w-4" /> {formatDate(e.start, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              </span>
              <span className="flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2 text-brand-700">
                <Clock className="h-4 w-4" /> {time}{endTime ? ` – ${endTime}` : ""}
              </span>
              <span className="flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2 text-brand-700">
                <MapPin className="h-4 w-4" /> {e.location}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05} className="mt-8">
            <h2 className="font-display text-xl font-semibold text-brand-900">About this event</h2>
            <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-ink-soft">{e.description}</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-8">
            <h2 className="font-display text-xl font-semibold text-brand-900">Location</h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-ink-soft"><MapPin className="h-4 w-4 text-brand-500" /> {e.address}</p>
            <div className="mt-3 aspect-[16/7] rounded-2xl bg-grid" style={gradientStyle(e.hue, true)} />
          </Reveal>

          <div className="mt-8 flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2 text-sm text-ink-soft hover:text-brand-600">
              <Share2 className="h-4 w-4" /> Share event
            </button>
            {program && (
              <Link href={`/events/programs/${program.slug}`} className="flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2 text-sm text-ink-soft hover:text-brand-600">
                <Tag className="h-4 w-4" /> More {program.name}
              </Link>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-28">
            <RegistrationPanel slug={e.slug} price={e.price} capacity={e.capacity} registered={e.registered} />
          </div>
        </div>
      </Container>

      <Container>
        <Link href="/events" className="mb-12 inline-flex items-center gap-2 text-sm text-brand-600 hover:gap-2.5">
          <ArrowLeft className="h-4 w-4" /> All events
        </Link>
      </Container>
    </>
  );
}
