import { Download, CreditCard, CheckCircle2 } from "lucide-react";
import { Panel } from "@/components/dashboard/widgets";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

const invoices = [
  { id: "TLC-2026-0042", date: "Mar 14, 2026", amount: 30000, status: "Paid" },
  { id: "TLC-2025-0039", date: "Mar 14, 2025", amount: 30000, status: "Paid" },
  { id: "TLC-2024-0031", date: "Mar 14, 2024", amount: 20000, status: "Paid" },
];

export default function PortalBillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-brand-900">Billing</h1>
        <p className="text-sm text-muted">Your plan, invoices, and receipts.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Current plan">
          <div className="font-display text-2xl font-bold text-brand-900">Business · $300<span className="text-sm font-normal text-muted">/yr</span></div>
          <p className="mt-1 text-sm text-muted">More than 25 employees</p>
          <Badge tone="success" className="mt-3"><CheckCircle2 className="h-3.5 w-3.5" /> Auto-renew on</Badge>
          <div className="mt-4 flex gap-2">
            <button className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600">Upgrade</button>
            <button className="rounded-xl border border-line px-4 py-2 text-sm font-medium text-ink-soft hover:bg-brand-50">Manage</button>
          </div>
        </Panel>

        <Panel title="Payment method">
          <div className="flex items-center gap-3 rounded-xl border border-line bg-canvas p-4">
            <CreditCard className="h-6 w-6 text-brand-500" />
            <div>
              <div className="text-sm font-medium text-brand-900">Visa ending 4242</div>
              <div className="text-xs text-muted">Expires 09 / 28</div>
            </div>
          </div>
          <button className="mt-3 text-sm text-brand-600 hover:underline">Update payment method</button>
        </Panel>

        <Panel title="Next renewal">
          <div className="font-display text-2xl font-bold text-brand-900">Mar 14, 2027</div>
          <p className="mt-1 text-sm text-muted">$300.00 will be charged automatically.</p>
        </Panel>
      </div>

      <Panel title="Invoices & receipts">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                <th className="pb-3 font-medium">Invoice</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {invoices.map((i) => (
                <tr key={i.id} className="hover:bg-brand-50/50">
                  <td className="py-3 font-medium text-brand-900">{i.id}</td>
                  <td className="py-3 text-ink-soft">{i.date}</td>
                  <td className="py-3 text-ink-soft">{formatCurrency(i.amount)}</td>
                  <td className="py-3"><Badge tone="success">{i.status}</Badge></td>
                  <td className="py-3 text-right">
                    <button className="inline-flex items-center gap-1 text-brand-600 hover:underline"><Download className="h-4 w-4" /> PDF</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
