import { apiJson, apiError, apiOptions } from "@/lib/api-response";
import { getEvent, getProgram } from "@/server/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return apiError("Event not found", 404);
  const program = event.program ? await getProgram(event.program) : null;
  return apiJson({ event, program });
}

export function OPTIONS() {
  return apiOptions();
}
