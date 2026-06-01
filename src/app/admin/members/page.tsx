import { Inbox } from "lucide-react";
import { MembersTable } from "@/components/admin/members-table";
import { Panel } from "@/components/dashboard/widgets";
import { Badge } from "@/components/ui/badge";
import { getBusinesses } from "@/server/queries";
import { pendingApplications } from "@/server/admin";

export default async function AdminMembers() {
  const [businesses, applications] = await Promise.all([getBusinesses(), pendingApplications()]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-brand-900">Members</h1>
        <p className="text-sm text-muted">{businesses.length} member businesses · {applications.length} pending application{applications.length === 1 ? "" : "s"}</p>
      </div>

      {applications.length > 0 && (
        <Panel title="Pending applications">
          <ul className="divide-y divide-line">
            {applications.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Inbox className="h-4 w-4" /></span>
                  <div>
                    <p className="font-medium text-brand-900">{a.name}</p>
                    <p className="text-xs text-muted">{a.detail}</p>
                  </div>
                </div>
                <Badge tone="info">New</Badge>
              </li>
            ))}
          </ul>
        </Panel>
      )}

      <MembersTable businesses={businesses} />
    </div>
  );
}
