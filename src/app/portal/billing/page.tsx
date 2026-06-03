import Link from "next/link";
import { CheckCircle2, Receipt } from "lucide-react";
import { auth } from "@/auth";
import { Panel } from "@/components/dashboard/widgets";
import { Badge } from "@/components/ui/badge";
import { getMyBilling } from "@/server/member";
import { formatCurrency, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const statusTone = (s: string): "success" | "warning" | "neutral" | "danger" =>
  s === "ACTIVE" || s === "SUCCEEDED" ? "success"
  : s === "PAST_DUE" || s === "PENDING" ? "warning"
  : s === "CANCELLED" || s === "FAILED" || s === "EXPIRED" ? "danger"
  : "neutral";

const titleCase = (s: string) => s ? s[0] + s.slice(1).toLowerCase().replace(/_/g, " ") : s;

export default async function PortalBillingPage() {
  const session = await auth();
  const uid = (session?.user as { id?: string } | undefined)?.id;
  const { membership, payments } = uid
    ? await getMyBilling(uid)
    : { membership: null, payments: [] };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-brand-900">Billing</h1>
        <p className="text-sm text-muted">Your plan, renewal, and payment history.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Current plan">
          {membership ? (
            <>
              <div className="font-display text-2xl font-bold text-brand-900">
                {membership.planName}
                {membership.priceCents > 0 && (
                  <span className="text-sm font-normal text-muted"> · {formatCurrency(membership.priceCents)}/yr</span>
                )}
              </div>
              {membership.audience && <p className="mt-1 text-sm text-muted">{membership.audience}</p>}
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge tone={statusTone(membership.status)}>{titleCase(membership.status)}</Badge>
                {membership.autoRenew && <Badge tone="success"><CheckCircle2 className="h-3.5 w-3.5" /> Auto-renew on</Badge>}
              </div>
              <div className="mt-4">
                <Link href="/membership" className="rounded-full bg-[#2a7fb8] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#236d9f]">Manage membership</Link>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-muted">You don&apos;t have an active membership on file.</p>
              <div className="mt-4">
                <Link href="/membership/apply" className="rounded-full bg-[#2a7fb8] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#236d9f]">Become a member</Link>
              </div>
            </>
          )}
        </Panel>

        <Panel title="Next renewal">
          {membership?.expiresAt ? (
            <>
              <div className="font-display text-2xl font-bold text-brand-900">{formatDate(membership.expiresAt, { month: "short", day: "numeric", year: "numeric" })}</div>
              <p className="mt-1 text-sm text-muted">
                {membership.autoRenew ? "Renews automatically." : "Renew before this date to keep your benefits."}
              </p>
            </>
          ) : (
            <p className="text-sm text-muted">No renewal date on file.</p>
          )}
        </Panel>

        <Panel title="Member since">
          {membership?.startedAt ? (
            <div className="font-display text-2xl font-bold text-brand-900">{formatDate(membership.startedAt, { month: "short", year: "numeric" })}</div>
          ) : (
            <p className="text-sm text-muted">—</p>
          )}
          <p className="mt-1 text-sm text-muted">Thank you for supporting the Village.</p>
        </Panel>
      </div>

      <Panel title="Payment history">
        {payments.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-400"><Receipt className="h-6 w-6" /></span>
            <p className="text-sm text-muted">No payments recorded yet. Receipts will appear here after your first transaction.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-brand-50/50">
                    <td className="py-3 text-ink-soft">{formatDate(p.createdAt, { month: "short", day: "numeric", year: "numeric" })}</td>
                    <td className="py-3 text-ink-soft">{titleCase(p.kind)}</td>
                    <td className="py-3 font-medium text-brand-900">{formatCurrency(p.amountCents)}</td>
                    <td className="py-3 text-right"><Badge tone={statusTone(p.status)}>{titleCase(p.status)}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}
