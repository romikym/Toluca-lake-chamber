import type { Metadata } from "next";
import { ShieldCheck, Clock, Sparkles } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { heroImages } from "@/lib/images";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { RenewPanel } from "@/components/forms/renew-panel";

export const metadata: Metadata = {
  title: "Renew Membership",
  description:
    "Renew your Toluca Lake Chamber membership in under a minute and keep your spot in the Village — directory listing, member pricing, and perks intact.",
};

const reasons = [
  { icon: Sparkles, title: "Keep your listing live", body: "Stay discoverable in the directory and keep your member perks active." },
  { icon: ShieldCheck, title: "Uninterrupted benefits", body: "Member pricing, exposure, and your voice with local leadership — without a gap." },
  { icon: Clock, title: "Under a minute", body: "Confirm your level, your email, and you're renewed for another year." },
];

export default async function RenewPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; canceled?: string }>;
}) {
  const { plan, canceled } = await searchParams;
  return (
    <>
      <PageHero
        eyebrow="Welcome back"
        image={heroImages.renew}
        title="Renew your spot in the Village"
        description="Thank you for another year of building Toluca Lake together. Renewing keeps your directory listing, member pricing, and perks running without interruption."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Membership", href: "/membership" }, { label: "Renew" }]}
      />
      <section className="section">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-brand-900 sm:text-4xl text-balance">
              Why renew today
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
              Your membership is what keeps the Chamber — and the Village — strong. Renew now to stay connected all year.
            </p>
            <div className="mt-8 space-y-4">
              {reasons.map((r) => (
                <div key={r.title} className="card-glass card-glass-lift flex items-start gap-5 rounded-3xl p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5be2a1] to-[#00a76d] text-white shadow-emerald-soft">
                    <r.icon className="h-5 w-5" strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-brand-900">{r.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{r.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            {canceled && (
              <div className="mb-5 rounded-2xl border border-[#ecdcbd] bg-[#f6efe0] px-5 py-3.5 text-sm text-warning">
                Your renewal was canceled — no charge was made. You can pick up again whenever you&apos;re ready.
              </div>
            )}
            <RenewPanel initialPlan={plan} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
