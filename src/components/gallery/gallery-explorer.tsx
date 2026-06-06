"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryAlbum } from "@/lib/gallery";
import { cn } from "@/lib/utils";

type Active = { album: number; photo: number } | null;

export function GalleryExplorer({ albums }: { albums: GalleryAlbum[] }) {
  const reduce = useReducedMotion();
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(albums.map((a) => a.category)))],
    [albums]
  );
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<Active>(null);

  const visible = albums
    .map((a, i) => ({ a, i }))
    .filter(({ a }) => filter === "All" || a.category === filter);

  const currentAlbum = active ? albums[active.album] : null;
  const currentPhoto = currentAlbum ? currentAlbum.photos[active!.photo] : null;

  const step = useCallback(
    (dir: 1 | -1) => {
      setActive((prev) => {
        if (!prev) return prev;
        const photos = albums[prev.album].photos;
        const next = (prev.photo + dir + photos.length) % photos.length;
        return { ...prev, photo: next };
      });
    },
    [albums]
  );

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, step]);

  return (
    <>
      {/* Category filter — segmented */}
      <div className="no-scrollbar -mx-4 mb-12 flex gap-2 overflow-x-auto px-4 sm:justify-center">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cn(
              "shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.97]",
              filter === c
                ? "bg-brand-800 text-white shadow-sm"
                : "border border-line bg-surface text-ink-soft hover:border-brand-300 hover:text-brand-800"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-20">
        {visible.map(({ a, i }) => (
          <section key={a.slug}>
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-semibold text-brand-900 sm:text-3xl">{a.title}</h2>
                <p className="mt-1.5 max-w-xl text-[15px] leading-relaxed text-ink-soft">{a.description}</p>
              </div>
              <span className="shrink-0 text-sm font-medium text-muted">
                {new Date(a.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </span>
            </div>

            <div className="columns-2 gap-4 [column-fill:_balance] sm:columns-3 lg:columns-3 [&>*]:mb-4">
              {a.photos.map((p, pi) => (
                <button
                  key={pi}
                  onClick={() => setActive({ album: i, photo: pi })}
                  className={cn(
                    "group relative block w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-line transition-all duration-300 hover:shadow-lg active:scale-[0.985]",
                    p.span === "wide" && "sm:break-inside-avoid",
                    p.span === "tall" && "break-inside-avoid"
                  )}
                  aria-label={`Open photo: ${p.alt}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {currentPhoto && currentAlbum && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-brand-950/90 p-4 backdrop-blur-xl"
            onClick={() => setActive(null)}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); step(-1); }}
              className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); step(1); }}
              className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.figure
              key={`${active!.album}-${active!.photo}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[86vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                className="max-h-[78vh] w-auto rounded-2xl object-contain shadow-2xl"
              />
              <figcaption className="mt-4 flex items-center justify-between gap-4 text-sm text-white/80">
                <span>{currentPhoto.alt}</span>
                <span className="shrink-0 text-white/55">
                  {currentAlbum.title} · {active!.photo + 1}/{currentAlbum.photos.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
