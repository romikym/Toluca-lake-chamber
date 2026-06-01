import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone, Globe, Mail, ArrowLeft, Share2, Heart } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { GradientAvatar, GradientCover, gradientStyle } from "@/components/ui/gradient";
import { BusinessCard } from "@/components/cards/business-card";
import { Reveal } from "@/components/ui/reveal";
import { categoryName } from "@/lib/data";
import { getBusiness, getBusinesses, getRelatedBusinesses } from "@/server/queries";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  try {
    const businesses = await getBusinesses();
    return businesses.map((b) => ({ slug: b.slug }));
  } catch {
    return []; // DB not reachable at build — render on demand instead
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = await getBusiness(slug);
  if (!b) return { title: "Member not found" };
  return { title: b.name, description: b.tagline };
}

export default async function BusinessProfile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = await getBusiness(slug);
  if (!b) notFound();

  const related = await getRelatedBusinesses(b.category, b.slug, 3);

  return (
    <>
      {/* Cover */}
      <GradientCover name={b.name} hue={b.hue} className="h-48 sm:h-60" />
      <Container className="relative">
        <div className="-mt-16 flex flex-col gap-5 sm:-mt-20 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-5">
            <GradientAvatar name={b.name} hue={b.hue} className="h-28 w-28 rounded-3xl border-4 border-surface text-2xl shadow-md" rounded="rounded-3xl" />
            <div className="pb-1">
              <div className="flex items-center gap-2">
                {b.tier === "PREMIUM" && <Badge tone="premium">Premium member</Badge>}
                {b.tier === "FEATURED" && <Badge tone="brand">Featured member</Badge>}
              </div>
              <h1 className="mt-2 font-display text-3xl font-bold text-brand-900">{b.name}</h1>
              <p className="text-sm text-muted">{categoryName(b.category)}</p>
            </div>
          </div>
          <div className="flex gap-2 pb-2">
            <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface text-muted hover:text-brand-600" aria-label="Save"><Heart className="h-5 w-5" /></button>
            <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface text-muted hover:text-brand-600" aria-label="Share"><Share2 className="h-5 w-5" /></button>
          </div>
        </div>

        <div className="mt-10 grid gap-10 pb-20 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="font-display text-xl font-semibold text-brand-900">About</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{b.description}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                {b.name} is a proud member of the Toluca Lake Chamber of Commerce, part of a
                network of 120+ local businesses serving the Village.
              </p>
            </Reveal>

            <Reveal delay={0.05} className="mt-10">
              <h2 className="font-display text-xl font-semibold text-brand-900">Gallery</h2>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="aspect-[4/3] rounded-xl" style={gradientStyle(b.hue + i * 6, true)} />
                ))}
              </div>
            </Reveal>

            {related.length > 0 && (
              <Reveal delay={0.1} className="mt-12">
                <h2 className="font-display text-xl font-semibold text-brand-900">Similar members</h2>
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  {related.map((r) => <BusinessCard key={r.slug} b={r} />)}
                </div>
              </Reveal>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm lg:sticky lg:top-28">
              <h3 className="font-display font-semibold text-brand-900">Contact</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-3 text-ink-soft"><MapPin className="mt-0.5 h-4 w-4 text-brand-500" /> {b.address}</li>
                {b.phone && <li className="flex items-center gap-3 text-ink-soft"><Phone className="h-4 w-4 text-brand-500" /> {b.phone}</li>}
                {b.website && <li className="flex items-center gap-3 text-ink-soft"><Globe className="h-4 w-4 text-brand-500" /> {b.website}</li>}
                <li className="flex items-center gap-3 text-ink-soft"><Mail className="h-4 w-4 text-brand-500" /> via Chamber</li>
              </ul>
              <div className="mt-5 aspect-video rounded-xl bg-grid" style={gradientStyle(b.hue, true)} />
              <ButtonLink href="/contact" className="mt-5 w-full">Contact this business</ButtonLink>
            </div>
          </div>
        </div>

        <Link href="/directory" className="mb-12 inline-flex items-center gap-2 text-sm text-brand-600 hover:gap-2.5">
          <ArrowLeft className="h-4 w-4" /> Back to directory
        </Link>
      </Container>
    </>
  );
}
