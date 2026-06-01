import { apiJson, apiOptions } from "@/lib/api-response";
import { getPlans } from "@/server/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const plans = await getPlans();
  return apiJson({ plans });
}

export function OPTIONS() {
  return apiOptions();
}
