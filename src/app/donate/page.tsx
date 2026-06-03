import type { Metadata } from "next";
import { HandHeart, Sprout, Users } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { DonateWidget } from "@/components/forms/donate-widget";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support the programs and events that keep Toluca Lake thriving.",
};

const uses = [
  { icon: Sprout, title: "Community programs", body: "Cleanups, health fairs, and beautification that keep the Village vibrant." },
  { icon: Users, title: "Local events", body: "Mixers, the Art Fair, and the Holiday Open House that bring neighbors together." },
  { icon: HandHeart, title: "Small-business support", body: "Resources and advocacy that help local businesses grow and thrive." },
];

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Support the Village"
        image="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1900&q=80"
        title="Your gift keeps Toluca Lake thriving"
        description="Every contribution helps fund the community programs, events, and advocacy that make the Village special."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Donate" }]}
      />
      <section className="section">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-brand-900 sm:text-4xl">Where your donation goes</h2>
            <div className="mt-7 space-y-4">
              {uses.map((u) => (
                <div key={u.title} className="card-glass card-glass-lift flex items-start gap-5 rounded-3xl p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5be2a1] to-[#00a76d] text-white shadow-emerald-soft"><u.icon className="h-5 w-5" strokeWidth={2.2} /></div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-brand-900">{u.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{u.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card-glass rounded-3xl p-8">
              <DonateWidget />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
