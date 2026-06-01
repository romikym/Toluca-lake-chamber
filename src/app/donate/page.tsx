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
        title="Your gift keeps Toluca Lake thriving"
        description="Every contribution helps fund the community programs, events, and advocacy that make the Village special."
        hue={148}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Donate" }]}
      />
      <section className="py-12">
        <Container className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-brand-900">Where your donation goes</h2>
            <div className="mt-6 space-y-4">
              {uses.map((u) => (
                <div key={u.title} className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-5 shadow-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600"><u.icon className="h-5 w-5" /></div>
                  <div>
                    <h3 className="font-display font-semibold text-brand-900">{u.title}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{u.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <DonateWidget />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
