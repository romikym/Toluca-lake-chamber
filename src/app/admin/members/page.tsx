import { MembersManager } from "@/components/admin/members-manager";
import { getBusinesses, getCategories } from "@/server/queries";
import { pendingApplications } from "@/server/admin";

export const dynamic = "force-dynamic";

export default async function AdminMembers() {
  const [businesses, categories, applications] = await Promise.all([
    getBusinesses(), getCategories(), pendingApplications(),
  ]);
  return <MembersManager businesses={businesses} categories={categories} applications={applications} />;
}
