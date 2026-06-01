import type { Metadata } from "next";
import { Mail, CalendarClock } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { GradientAvatar } from "@/components/ui/gradient";
import { Badge } from "@/components/ui/badge";
import { getBoard } from "@/server/queries";

export const metadata: Metadata = {
  title: "Meet the Board",
  description:
    "An all-volunteer team of local business owners and community leaders who support the Toluca Lake Chamber of Commerce.",
};

const groups = ["Executive", "Director", "Honorary", "Staff"] as const;
const groupLabel: Record<string, string> = {
  Executive: "Executive Board",
  Director: "Board of Directors",
  Honorary: "Honorary Directors",
  Staff: "Administration",
};

export const dynamic = "force-dynamic";

export default async function BoardPage() {
  const board = await getBoard();
  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="Meet the Board"
        description="The Toluca Lake Chamber of Commerce is led by a volunteer board made up of local business owners, community leaders, and longtime supporters of the neighborhood. Together, the board helps guide the Chamber's events, partnerships, and community initiatives while supporting the businesses and relationships that make Toluca Lake feel connected and unique."
        hue={158}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Board" }]}
      />

      <section className="py-12">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start gap-3 rounded-2xl border border-line bg-brand-50/60 p-5 sm:flex-row sm:items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                <CalendarClock className="h-5 w-5" />
              </div>
              <p className="text-sm text-ink-soft">
                Board meetings are held the <strong>second Tuesday of each month at 5:30 pm</strong>.
                Agenda items can be submitted to <a className="text-brand-600 underline" href="mailto:president@tolucalakechamber.com">president@tolucalakechamber.com</a>. Attendance is by invitation.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {groups.map((g) => {
        const members = board.filter((m) => m.group === g);
        if (!members.length) return null;
        return (
          <section key={g} className="pb-12">
            <Container>
              <h2 className="mb-6 font-display text-2xl font-semibold text-brand-900">{groupLabel[g]}</h2>
              <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {members.map((m) => (
                  <StaggerItem key={m.name}>
                    <div className="flex h-full items-center gap-4 rounded-2xl border border-line bg-surface p-5 shadow-sm">
                      <GradientAvatar name={m.name} hue={m.hue} className="h-14 w-14 shrink-0 rounded-full text-base" rounded="rounded-full" />
                      <div className="min-w-0">
                        <h3 className="font-display font-semibold text-brand-900">{m.name}</h3>
                        <p className="text-sm text-brand-600">{m.role}</p>
                        {m.company && <p className="truncate text-xs text-muted">{m.company}</p>}
                        {m.email && (
                          <a href={`mailto:${m.email}`} className="mt-1 inline-flex items-center gap-1 text-xs text-muted hover:text-brand-600">
                            <Mail className="h-3 w-3" /> Email
                          </a>
                        )}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </Container>
          </section>
        );
      })}
    </>
  );
}
