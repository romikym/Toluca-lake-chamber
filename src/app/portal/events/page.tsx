import { auth } from "@/auth";
import { getMyRegistrations } from "@/server/member";
import { MyEventsList } from "@/components/portal/events-list";

export const dynamic = "force-dynamic";

export default async function PortalEventsPage() {
  const session = await auth();
  const uid = (session?.user as { id?: string } | undefined)?.id;
  const registrations = uid ? await getMyRegistrations(uid) : [];
  return <MyEventsList registrations={registrations} />;
}
