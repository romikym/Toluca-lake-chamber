import type { Metadata } from "next";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/forms/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Have questions or want to get involved? Reach out, we are here to help and connect.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Have questions or want to get involved?"
        description="Reach out by filling out the form below. We are here to help and connect."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="section">
        <Container className="grid gap-10 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="card-glass rounded-3xl p-8 sm:p-10">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-1">
            <div className="card-glass rounded-3xl p-7">
              <h2 className="font-display text-xl font-semibold text-brand-900">Chamber office</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#baf2d1] to-[#35d08a] text-brand-900 shadow-emerald-soft"><Mail className="h-4 w-4" /></span>
                  <a href={`mailto:${site.email}`} className="text-ink-soft transition hover:text-brand-700">{site.email}</a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#baf2d1] to-[#35d08a] text-brand-900 shadow-emerald-soft"><Phone className="h-4 w-4" /></span>
                  <a href={site.phoneHref} className="text-ink-soft transition hover:text-brand-700">{site.phone}</a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#baf2d1] to-[#35d08a] text-brand-900 shadow-emerald-soft"><MapPin className="h-4 w-4" /></span>
                  <span className="text-ink-soft">{site.address.line1}<br />{site.address.city}, {site.address.state} {site.address.zip}</span>
                </li>
              </ul>
              <div className="mt-7 flex gap-3">
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition hover:-translate-y-0.5 hover:bg-brand-100" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition hover:-translate-y-0.5 hover:bg-brand-100" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
