"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, Pencil, Trash2, Loader2, Inbox, Check, X } from "lucide-react";
import { Panel } from "@/components/dashboard/widgets";
import { Badge } from "@/components/ui/badge";
import { GradientAvatar } from "@/components/ui/gradient";
import { Modal, Field, TextArea, Select } from "@/components/ui/modal";
import { saveBusiness, deleteBusiness, approveApplication, rejectApplication } from "@/app/actions/admin";
import { categoryName, type Business, type Category } from "@/lib/data";
import { cn } from "@/lib/utils";

type Application = { id: string; name: string; detail: string };
const tierFilters = ["All", "PREMIUM", "FEATURED", "STANDARD"];
const tierLabel = (t: string) => t[0] + t.slice(1).toLowerCase();

export function MembersManager({
  businesses, categories, applications,
}: {
  businesses: Business[]; categories: Category[]; applications: Application[];
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [tier, setTier] = useState("All");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Business | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appBusy, setAppBusy] = useState<string | null>(null);

  const rows = useMemo(
    () => businesses.filter((b) => (!q || b.name.toLowerCase().includes(q.toLowerCase())) && (tier === "All" || b.tier === tier)),
    [businesses, q, tier]
  );

  function openCreate() { setEditing(null); setError(null); setOpen(true); }
  function openEdit(b: Business) { setEditing(b); setError(null); setOpen(true); }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    setBusy(true); setError(null);
    const res = await saveBusiness({
      slug: editing?.slug,
      name: String(fd.get("name") ?? ""),
      categoryKey: String(fd.get("categoryKey") ?? categories[0]?.key),
      tagline: String(fd.get("tagline") ?? ""),
      description: String(fd.get("description") ?? ""),
      tier: String(fd.get("tier") ?? "STANDARD"),
      status: String(fd.get("status") ?? "PUBLISHED"),
      phone: String(fd.get("phone") ?? "") || undefined,
      website: String(fd.get("website") ?? "") || undefined,
      address: String(fd.get("address") ?? ""),
      hue: Number(fd.get("hue") ?? 150),
    });
    setBusy(false);
    if (res.ok) { setOpen(false); router.refresh(); }
    else setError(res.error ?? "Something went wrong.");
  }

  async function onDelete(b: Business) {
    if (!confirm(`Remove "${b.name}" from the directory?`)) return;
    const res = await deleteBusiness(b.slug);
    if (res.ok) router.refresh(); else alert(res.error);
  }

  async function handleApp(id: string, approve: boolean) {
    setAppBusy(id);
    const res = approve ? await approveApplication(id) : await rejectApplication(id);
    setAppBusy(null);
    if (res.ok) router.refresh(); else alert(res.error);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-900">Members</h1>
          <p className="text-sm text-muted">{businesses.length} businesses · {applications.length} pending application{applications.length === 1 ? "" : "s"}</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-[#2a7fb8] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#236d9f]"><Plus className="h-4 w-4" /> Add member</button>
      </div>

      {applications.length > 0 && (
        <Panel title="Pending applications">
          <ul className="divide-y divide-line">
            {applications.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Inbox className="h-4 w-4" /></span>
                  <div>
                    <p className="font-medium text-brand-900">{a.name}</p>
                    <p className="text-xs text-muted">{a.detail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {appBusy === a.id ? <Loader2 className="h-4 w-4 animate-spin text-muted" /> : (
                    <>
                      <button onClick={() => handleApp(a.id, true)} className="flex items-center gap-1 rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-700 hover:bg-brand-100"><Check className="h-3.5 w-3.5" /> Approve</button>
                      <button onClick={() => handleApp(a.id, false)} className="flex items-center gap-1 rounded-lg bg-danger-soft px-3 py-1.5 text-xs font-medium text-danger hover:brightness-95"><X className="h-3.5 w-3.5" /> Reject</button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search members…" className="h-11 w-full rounded-xl border border-line bg-surface pl-10 pr-4 text-sm outline-none focus:border-brand-500" />
        </div>
        <div className="flex gap-1 rounded-xl border border-line bg-surface p-1">
          {tierFilters.map((s) => (
            <button key={s} onClick={() => setTier(s)} className={cn("rounded-lg px-3 py-1.5 text-sm font-medium", tier === s ? "bg-brand-100 text-brand-700" : "text-muted hover:text-brand-600")}>{s === "All" ? "All" : tierLabel(s)}</button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-canvas/60 text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-5 py-3 font-medium">Business</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Tier</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((b) => (
                <tr key={b.slug} className="hover:bg-brand-50/40">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <GradientAvatar name={b.name} hue={b.hue} className="h-9 w-9 rounded-lg text-[11px]" rounded="rounded-lg" />
                      <span className="font-medium text-brand-900">{b.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-ink-soft">{categoryName(b.category)}</td>
                  <td className="px-5 py-3"><Badge tone={b.tier === "PREMIUM" ? "premium" : b.tier === "FEATURED" ? "brand" : "neutral"}>{tierLabel(b.tier)}</Badge></td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(b)} className="rounded-lg p-1.5 text-muted hover:bg-brand-50 hover:text-brand-600" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => onDelete(b)} className="rounded-lg p-1.5 text-muted hover:bg-danger-soft hover:text-danger" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && <p className="px-5 py-10 text-center text-sm text-muted">No members match your filters.</p>}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Edit member" : "Add member"}>
        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
          <Field label="Business name" name="name" defaultValue={editing?.name} required full />
          <Select label="Category" name="categoryKey" defaultValue={editing?.category ?? categories[0]?.key} options={categories.map((c) => ({ value: c.key, label: c.name }))} />
          <Select label="Tier" name="tier" defaultValue={editing?.tier ?? "STANDARD"} options={["STANDARD", "FEATURED", "PREMIUM"].map((t) => ({ value: t, label: tierLabel(t) }))} />
          <Field label="Tagline" name="tagline" defaultValue={editing?.tagline} full />
          <TextArea label="Description" name="description" defaultValue={editing?.description} rows={3} />
          <Field label="Phone" name="phone" defaultValue={editing?.phone} />
          <Field label="Website" name="website" defaultValue={editing?.website} />
          <Field label="Address" name="address" defaultValue={editing?.address} full />
          <Select label="Status" name="status" defaultValue="PUBLISHED" options={["PUBLISHED", "PENDING", "DRAFT", "HIDDEN"].map((s) => ({ value: s, label: tierLabel(s) }))} />
          <Field label="Hue (color 0–360)" name="hue" type="number" defaultValue={editing?.hue ?? 150} />

          {error && <p className="rounded-xl bg-danger-soft px-3 py-2 text-sm text-danger sm:col-span-2">{error}</p>}
          <div className="flex justify-end gap-2 sm:col-span-2">
            <button type="button" onClick={() => setOpen(false)} className="rounded-xl border border-line px-4 py-2 text-sm font-medium text-ink-soft hover:bg-brand-50">Cancel</button>
            <button type="submit" disabled={busy} className="flex items-center gap-2 rounded-xl bg-[#2a7fb8] px-5 py-2 text-sm font-medium text-white hover:bg-[#236d9f] disabled:opacity-60">
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}{editing ? "Save changes" : "Add member"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
