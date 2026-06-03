import Link from "next/link";
import { Store } from "lucide-react";
import { auth } from "@/auth";
import { getBusiness, getCategories } from "@/server/queries";
import { BusinessForm } from "@/components/portal/business-form";

export const dynamic = "force-dynamic";

export default async function PortalBusinessPage() {
  const session = await auth();
  const slug = (session?.user as { businessSlug?: string | null } | undefined)?.businessSlug ?? null;
  const [business, categories] = await Promise.all([
    slug ? getBusiness(slug) : Promise.resolve(null),
    getCategories(),
  ]);

  if (!business) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-900">My Listing</h1>
          <p className="text-sm text-muted">Manage how your business appears in the directory.</p>
        </div>
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface p-12 text-center shadow-sm">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-400"><Store className="h-6 w-6" /></span>
          <p className="max-w-sm text-sm text-muted">
            There&apos;s no business linked to your account yet. The Chamber office can connect your
            directory listing — reach out and we&apos;ll set it up.
          </p>
          <Link href="/contact" className="rounded-full bg-[#2a7fb8] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#236d9f]">Contact the Chamber</Link>
        </div>
      </div>
    );
  }

  return <BusinessForm business={business} categories={categories} />;
}
