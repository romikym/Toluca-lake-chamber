import { ReportsView } from "@/components/admin/reports-view";
import { adminReports } from "@/server/admin";

export default async function AdminReports() {
  const data = await adminReports();
  return <ReportsView data={data} />;
}
