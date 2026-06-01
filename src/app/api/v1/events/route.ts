import { apiJson, apiOptions } from "@/lib/api-response";
import { getEvents, getPrograms } from "@/server/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const [events, programs] = await Promise.all([getEvents(), getPrograms()]);
  return apiJson({ events, programs });
}

export function OPTIONS() {
  return apiOptions();
}
