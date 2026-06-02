import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How the Toluca Lake Chamber of Commerce collects, uses, and protects your information.",
};

const sections = [
  { h: "Information we collect", p: "We collect information you provide directly, such as your name, business details, email, and phone number, when you join, register for events, contact us, or subscribe to our newsletter. We also collect limited technical data (such as analytics) to improve our website." },
  { h: "How we use information", p: "We use your information to manage your membership, process registrations and payments, send communications you have requested, operate the business directory, and improve our services." },
  { h: "Payment information", p: "Payments are processed securely by our payment provider (Stripe). We do not store full card details on our servers." },
  { h: "Sharing", p: "We do not sell your personal information. Public directory listings display only the business information you choose to publish. We share data with service providers only as needed to operate the platform." },
  { h: "Your choices", p: "You can update your profile, manage email preferences, or request deletion of your account at any time by contacting us." },
  { h: "Contact", p: `Questions about this policy? Email ${site.email} or write to ${site.address.line1}, ${site.address.city}, ${site.address.state} ${site.address.zip}.` },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" breadcrumb={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />
      <section className="section">
        <Container className="max-w-3xl">
          <p className="card-glass rounded-2xl p-5 text-sm text-muted">
            This is a working draft to be reviewed and finalized by counsel before launch.
          </p>
          <div className="mt-10 space-y-10">
            {sections.map((s) => (
              <div key={s.h}>
                <h2 className="font-display text-2xl font-semibold text-brand-900">{s.h}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{s.p}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
