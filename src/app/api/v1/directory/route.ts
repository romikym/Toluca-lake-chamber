import { apiJson, apiOptions } from "@/lib/api-response";
import { getBusinesses, getCategories } from "@/server/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const [businesses, categories] = await Promise.all([getBusinesses(), getCategories()]);
  return apiJson({ businesses, categories });
}

export function OPTIONS() {
  return apiOptions();
}
