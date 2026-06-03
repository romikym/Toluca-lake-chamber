import Link from "next/link";
import { CalendarCheck, CalendarClock, Store, ArrowRight, BadgeCheck, Award } from "lucide-react";
import { auth } from "@/auth";
import { StatTile, Panel } from "@/components/dashboard/widgets";
import { Badge } from "@/components/ui/badge";
import { getMemberDashboard } from "@/server/member";
import { formatCurrency, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const titleCase = (s: string) => s ? s[0] + s.slice(1).toLowerCase().replace(/_/g, " ") : s;

export default async function PortalDashboard() {
  const session = await auth();
  const uid = (session?.user as { id?: string } | undefined)?.id;
  const data = uid
    ? await getMemberDashboard(uid)
    : { name: "there", businessName: null, businessTier: null, registeredCount: 0, upcoming: [], memberSinceYear: null, membership: null };

  const firstName = data.name.split(" ")[0];
  const active = data.membership?.status === "ACTIVE";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-900">Welcome back, {firstName}</h1>
          <p className="text-sm text-muted">Here&apos;s what&apos;s happening with your membership.</p>
        </div>
        {data.membership && (
          <Badge tone={active ? "success" : "warning"}>
            <BadgeCheck className="h-3.5 w-3.5" /> {active ? "Active member" : titleCase(data.membership.status)}
          </Badge>
        )}
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile icon={CalendarCheck} label="Events registered" value={data.registeredCount} delta="all time" deltaTone="flat" />
        <StatTile icon={CalendarClock} label="Upcoming events" value={data.upcoming.length} delta={data.upcoming.length ? "booked" : "none"} deltaTone="flat" />
        <StatTile icon={Award} label="Member since" value={data.memberSinceYear ?? new Date().getFullYear()} raw delta={data.membership ? titleCase(data.membership.status) : "—"} deltaTone={active ? "up" : "flat"} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Panel
            title="Your upcoming events"
            action={<Link href="/portal/events" className="text-sm text-brand-600 hover:underline">View all</Link>}
          >
            {data.upcoming.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <p className="text-sm text-muted">You have no upcoming events booked.</p>
                <Link href="/events" className="rounded-full bg-[#2a7fb8] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#236d9f]">Browse events</Link>
              </div>
            ) : (
              <ul className="divide-y divide-line">
                {data.upcoming.map((e) => (
                  <li key={e.slug} className="flex items-center justify-between py-3">
                    <div>
                      <Link href={`/events/${e.slug}`} className="font-medium text-brand-900 hover:text-brand-600">{e.title}</Link>
                      <p className="text-xs text-muted">{formatDate(e.start, { weekday: "short", month: "short", day: "numeric" })} · {e.location}</p>
                    </div>
                    <Badge tone="brand">Registered</Badge>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>

        <Panel title="Membership">
          {data.membership ? (
            <div className="space-y-4">
              <div>
                <div className="font-display text-xl font-bold text-brand-900">{data.membership.planName}</div>
                {data.membership.priceCents > 0 && (
                  <div className="text-sm text-muted">{formatCurrency(data.membership.priceCents)}/yr</div>
                )}
              </div>
              <div className="rounded-xl bg-brand-50 p-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted">Status</span>
                  <span className="font-semibold text-brand-800">{titleCase(data.membership.status)}</span>
                </div>
                {data.membership.expiresAt && (
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-muted">Renews</span>
                    <span className="font-semibold text-brand-800">{formatDate(data.membership.expiresAt, { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                )}
              </div>
              <Link href="/portal/billing" className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:gap-1.5">
                View billing <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3 py-2 text-sm text-muted">
              <p>No active membership on file.</p>
              <Link href="/membership/apply" className="inline-flex rounded-full bg-[#2a7fb8] px-4 py-2 font-medium text-white transition hover:bg-[#236d9f]">Become a member</Link>
            </div>
          )}
        </Panel>
      </div>

      <Link href="/portal/business" className="group flex flex-col justify-between rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-700 to-brand-500 p-6 text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:flex-row sm:items-center">
        <div>
          <Store className="h-7 w-7" />
          <h3 className="mt-3 font-display text-lg font-semibold">Manage your listing</h3>
          <p className="mt-1 max-w-md text-sm text-white/80">Keep your business profile, photos, and details up to date for the directory.</p>
        </div>
        <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium sm:mt-0">
          Edit listing <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </div>
  );
}
