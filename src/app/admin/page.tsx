import { OverviewView } from "@/components/admin/overview-view";
import { adminOverview, pendingApplications } from "@/server/admin";

export default async function AdminOverview() {
  const [data, pending] = await Promise.all([adminOverview(), pendingApplications()]);
  return <OverviewView data={data} pending={pending} />;
}
