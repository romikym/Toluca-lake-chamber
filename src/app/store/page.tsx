import type { Metadata } from "next";
import { Check, AlertCircle, Heart, Leaf } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { heroImages } from "@/lib/images";
import { Container } from "@/components/ui/container";
import { StoreFront } from "@/components/store/store-front";
import { products } from "@/lib/store";

export const metadata: Metadata = {
  title: "Chamber Store",
  description:
    "Wear the Village and support the Chamber. Toluca Lake apparel, accessories, and gifts — every purchase funds community programs and events.",
};

export default async function StorePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Wear the Village"
        image={heroImages.store}
        title="The Chamber Store"
        description="Toluca Lake apparel, accessories, and gifts — designed in the Village, made to last. Every purchase helps fund the programs and events that keep our community thriving."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Store" }]}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur">
          <Heart className="h-4 w-4" /> Proceeds support the Chamber
        </span>
      </PageHero>

      <section className="section">
        <Container>
          {status === "success" && (
            <div className="mb-10 flex items-center gap-3 rounded-2xl border border-brand-200 bg-brand-50 px-5 py-4 text-sm font-medium text-brand-800">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white"><Check className="h-4 w-4" strokeWidth={3} /></span>
              Thank you! Your order was successful — a receipt is on its way to your inbox.
            </div>
          )}
          {status === "canceled" && (
            <div className="mb-10 flex items-center gap-3 rounded-2xl border border-[#ecdcbd] bg-[#f6efe0] px-5 py-4 text-sm font-medium text-warning">
              <AlertCircle className="h-5 w-5 shrink-0" />
              Your checkout was canceled — no charge was made. Your cart is still here when you&apos;re ready.
            </div>
          )}

          <StoreFront products={products} />
        </Container>
      </section>

      {/* Supporting line */}
      <section className="pb-24 sm:pb-28">
        <Container>
          <div
            className="relative overflow-hidden rounded-[2.5rem] px-8 py-14 text-center sm:px-14"
            style={{ background: "linear-gradient(120deg, #001d16 0%, #00563f 55%, #0a6b4e 100%)" }}
          >
            <div className="absolute inset-0 bg-grid opacity-[0.12]" />
            <div className="relative mx-auto max-w-2xl">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur">
                <Leaf className="h-7 w-7" strokeWidth={1.6} />
              </span>
              <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.1] text-white sm:text-4xl text-balance">
                Every purchase plants something
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/85">
                Proceeds from the Chamber Store go directly to clean-ups, the Art Fair, the Holiday Open House, and the advocacy that keeps Toluca Lake the Village it&apos;s always been.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
