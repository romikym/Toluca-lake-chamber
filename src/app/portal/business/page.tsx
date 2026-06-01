import { Upload, Save, Eye } from "lucide-react";
import { Panel } from "@/components/dashboard/widgets";
import { gradientStyle } from "@/components/ui/gradient";
import { categories } from "@/lib/data";

function Field({ label, value, hint, full }: { label: string; value?: string; hint?: string; full?: boolean }) {
  return (
    <label className={full ? "sm:col-span-2 block" : "block"}>
      <span className="mb-1.5 block text-sm font-medium text-ink-soft">{label}</span>
      <input defaultValue={value} className="h-11 w-full rounded-xl border border-line bg-canvas px-4 text-sm outline-none focus:border-brand-500 focus:bg-surface" />
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

export default function PortalBusinessPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-900">My Listing</h1>
          <p className="text-sm text-muted">Manage how your business appears in the directory.</p>
        </div>
        <div className="flex gap-2">
          <a href="/directory/compass-real-estate" className="flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-medium text-ink-soft hover:text-brand-600"><Eye className="h-4 w-4" /> Preview</a>
          <button className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"><Save className="h-4 w-4" /> Save changes</button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Panel title="Business details">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Business name" value="Compass Real Estate — Toluca Lake" full />
              <Field label="Tagline" value="Your Village real estate experts" full />
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-ink-soft">Description</span>
                <textarea rows={4} defaultValue="Local agents Taylor Montana and Corrie Sommers help you buy and sell in Toluca Lake." className="w-full rounded-xl border border-line bg-canvas p-4 text-sm outline-none focus:border-brand-500 focus:bg-surface" />
              </label>
              <Field label="Phone" value="818-555-0142" />
              <Field label="Website" value="compass.com" />
              <Field label="Address" value="4150 W Riverside Dr, Toluca Lake, CA 91505" full />
            </div>
          </Panel>

          <Panel title="Category">
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 8).map((c, i) => (
                <span key={c.key} className={i === 1 ? "rounded-full border border-brand-400 bg-brand-50 px-3 py-1.5 text-sm text-brand-700" : "rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-ink-soft"}>
                  {c.name}
                </span>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Logo & cover">
            <div className="h-24 rounded-xl" style={gradientStyle(168)} />
            <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-line py-6 text-sm text-muted hover:border-brand-300 hover:text-brand-600">
              <Upload className="h-4 w-4" /> Upload images
            </button>
          </Panel>
          <Panel title="Gallery">
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className="aspect-square rounded-lg" style={gradientStyle(168 + i * 5, true)} />)}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
