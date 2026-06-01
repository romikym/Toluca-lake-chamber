import { apiJson, apiError, apiOptions } from "@/lib/api-response";
import { getBusiness, getRelatedBusinesses } from "@/server/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const business = await getBusiness(slug);
  if (!business) return apiError("Business not found", 404);
  const related = await getRelatedBusinesses(business.category, business.slug, 3);
  return apiJson({ business, related });
}

export function OPTIONS() {
  return apiOptions();
}
