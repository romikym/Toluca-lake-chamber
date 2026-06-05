import type { Metadata } from "next";
import { Camera } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { GalleryExplorer } from "@/components/gallery/gallery-explorer";
import { galleryAlbums } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Moments from the Village — Toluca Lake Chamber events, clean-ups, the Art Fair, and the neighbors who make it all happen.",
};

export default function GalleryPage() {
  const photoCount = galleryAlbums.reduce((n, a) => n + a.photos.length, 0);

  return (
    <>
      <PageHero
        eyebrow="The Village, in pictures"
        image="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1900&q=80"
        title="Moments from Toluca Lake"
        description="Clean-ups, mixers, the Art Fair, and the Holiday Open House — a look at the people and places that make the Village feel like home."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Community" }, { label: "Gallery" }]}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur">
          <Camera className="h-4 w-4" /> {photoCount} photos · {galleryAlbums.length} albums
        </span>
      </PageHero>

      <section className="section">
        <Container>
          <GalleryExplorer albums={galleryAlbums} />
        </Container>
      </section>

      {/* CTA — invite members to contribute / promote */}
      <section className="pb-24 sm:pb-28">
        <Container>
          <div
            className="relative overflow-hidden rounded-[2.5rem] px-8 py-14 text-center sm:px-14"
            style={{ background: "linear-gradient(120deg, #001d16 0%, #00563f 55%, #0a6b4e 100%)" }}
          >
            <div className="absolute inset-0 bg-grid opacity-[0.12]" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-semibold leading-[1.1] text-white sm:text-4xl text-balance">
                Caught a great shot at a Chamber event?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/85">
                We&apos;d love to feature it. Members and neighbors can share photos for the gallery and newsletter.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/contact">Share your photos</ButtonLink>
                <ButtonLink href="/events" variant="glass-dark">See upcoming events</ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
