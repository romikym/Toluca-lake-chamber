import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms governing membership and use of the Toluca Lake Chamber of Commerce platform.",
};

const sections = [
  { h: "Membership", p: "Membership is subject to review and approval at the discretion of the not-for-profit board of advisors. If your application is not approved, you will receive a full refund." },
  { h: "Renewals & dues", p: "Memberships renew annually, a 12-month period from your join date. You may enroll in automatic recurring payments at checkout and cancel auto-renewal at any time." },
  { h: "Changes to tiers & benefits", p: "Membership tiers, facilities, and benefits may be modified, withdrawn, amended, or added at any time with notice. Members are deemed to have accepted such modifications; members who do not wish to accept changes may terminate their membership." },
  { h: "Directory listings", p: "Members are responsible for the accuracy of their directory content. We may remove content that is unlawful, misleading, or inconsistent with the Chamber's mission." },
  { h: "Acceptable use", p: "You agree to use the platform lawfully and not to misuse member data, disrupt the service, or infringe others' rights." },
  { h: "Limitation of liability", p: "The platform is provided as is. To the extent permitted by law, the Chamber is not liable for indirect or consequential damages arising from use of the service." },
];

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" breadcrumb={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
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
