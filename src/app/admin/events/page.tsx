import { EventsManager } from "@/components/admin/events-manager";
import { getEvents, getPrograms } from "@/server/queries";

export const dynamic = "force-dynamic";

export default async function AdminEvents() {
  const [events, programs] = await Promise.all([getEvents(), getPrograms()]);
  return <EventsManager events={events} programs={programs} />;
}
