"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Eye, Loader2, Check, ImageIcon } from "lucide-react";
import { Panel } from "@/components/dashboard/widgets";
import { gradientStyle } from "@/components/ui/gradient";
import { updateMyBusiness } from "@/app/actions/member";
import type { Business, Category } from "@/lib/data";

export function BusinessForm({
  business, categories,
}: {
  business: Business; categories: Category[];
}) {
  const router = useRouter();
  const [category, setCategory] = useState(business.category);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    setBusy(true); setError(null); setSaved(false);
    const res = await updateMyBusiness({
      name: String(fd.get("name") ?? ""),
      categoryKey: category,
      tagline: String(fd.get("tagline") ?? ""),
      description: String(fd.get("description") ?? ""),
      phone: String(fd.get("phone") ?? "") || undefined,
      website: String(fd.get("website") ?? "") || undefined,
      address: String(fd.get("address") ?? ""),
    });
    setBusy(false);
    if (res.ok) { setSaved(true); router.refresh(); setTimeout(() => setSaved(false), 2500); }
    else setError(res.error ?? "Something went wrong.");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-900">My Listing</h1>
          <p className="text-sm text-muted">Manage how your business appears in the directory.</p>
        </div>
        <div className="flex gap-2">
          <a href={`/directory/${business.slug}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-medium text-ink-soft transition hover:text-brand-600"><Eye className="h-4 w-4" /> Preview</a>
          <button type="submit" disabled={busy} className="flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-600 disabled:opacity-60">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {saved ? "Saved" : "Save changes"}
          </button>
        </div>
      </div>

      {error && <p className="rounded-xl bg-danger-soft px-3 py-2 text-sm text-danger">{error}</p>}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Panel title="Business details">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-ink-soft">Business name</span>
                <input name="name" defaultValue={business.name} required className="h-11 w-full rounded-xl border border-line bg-canvas px-4 text-sm outline-none focus:border-brand-500 focus:bg-surface" />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-ink-soft">Tagline</span>
                <input name="tagline" defaultValue={business.tagline} className="h-11 w-full rounded-xl border border-line bg-canvas px-4 text-sm outline-none focus:border-brand-500 focus:bg-surface" />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-ink-soft">Description</span>
                <textarea name="description" rows={4} defaultValue={business.description} className="w-full rounded-xl border border-line bg-canvas p-4 text-sm outline-none focus:border-brand-500 focus:bg-surface" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink-soft">Phone</span>
                <input name="phone" defaultValue={business.phone ?? ""} className="h-11 w-full rounded-xl border border-line bg-canvas px-4 text-sm outline-none focus:border-brand-500 focus:bg-surface" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink-soft">Website</span>
                <input name="website" defaultValue={business.website ?? ""} className="h-11 w-full rounded-xl border border-line bg-canvas px-4 text-sm outline-none focus:border-brand-500 focus:bg-surface" />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-ink-soft">Address</span>
                <input name="address" defaultValue={business.address} className="h-11 w-full rounded-xl border border-line bg-canvas px-4 text-sm outline-none focus:border-brand-500 focus:bg-surface" />
              </label>
            </div>
          </Panel>

          <Panel title="Category">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => {
                const active = c.key === category;
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setCategory(c.key)}
                    className={active
                      ? "rounded-full border border-brand-400 bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700"
                      : "rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-ink-soft hover:border-brand-300 hover:text-brand-600"}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Logo & cover">
            <div className="h-24 rounded-xl" style={gradientStyle(business.hue)} />
            <div className="mt-3 flex items-start gap-2 rounded-xl border border-line bg-canvas p-3 text-xs text-muted">
              <ImageIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <span>Your cover uses your brand color. To upload a logo or photo gallery, email the Chamber office and we&apos;ll add them for you.</span>
            </div>
          </Panel>
          <Panel title="Listing status">
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted">Tier</dt><dd className="font-medium text-brand-900">{business.tier[0] + business.tier.slice(1).toLowerCase()}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Directory URL</dt><dd className="font-medium text-brand-700">/{business.slug}</dd></div>
            </dl>
            <p className="mt-3 text-xs text-muted">Membership tier is managed by the Chamber. Contact us to upgrade.</p>
          </Panel>
        </div>
      </div>
    </form>
  );
}
