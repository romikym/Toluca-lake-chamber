"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Loader2, Users } from "lucide-react";
import { Panel } from "@/components/dashboard/widgets";
import { Badge } from "@/components/ui/badge";
import { Modal, Field, TextArea, Select } from "@/components/ui/modal";
import { saveEvent, deleteEvent } from "@/app/actions/admin";
import type { ChamberEvent, Program } from "@/lib/data";
import { formatDate } from "@/lib/utils";

function toLocalInput(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

export function EventsManager({ events, programs }: { events: ChamberEvent[]; programs: Program[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ChamberEvent | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sorted = [...events].sort((a, b) => +new Date(a.start) - +new Date(b.start));
  const programName = (slug: string) => programs.find((p) => p.slug === slug)?.name ?? "—";

  function openCreate() { setEditing(null); setError(null); setOpen(true); }
  function openEdit(e: ChamberEvent) { setEditing(e); setError(null); setOpen(true); }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    setBusy(true); setError(null);
    const res = await saveEvent({
      slug: editing?.slug,
      title: String(fd.get("title") ?? ""),
      programSlug: String(fd.get("programSlug") ?? "") || undefined,
      start: String(fd.get("start") ?? ""),
      end: String(fd.get("end") ?? "") || undefined,
      location: String(fd.get("location") ?? ""),
      address: String(fd.get("address") ?? ""),
      summary: String(fd.get("summary") ?? ""),
      description: String(fd.get("description") ?? ""),
      membersOnly: fd.get("membersOnly") === "on",
      priceCents: Math.round(Number(fd.get("priceDollars") ?? 0) * 100),
      capacity: Number(fd.get("capacity") ?? 100),
      hue: Number(fd.get("hue") ?? 150),
    });
    setBusy(false);
    if (res.ok) { setOpen(false); router.refresh(); }
    else setError(res.error ?? "Something went wrong.");
  }

  async function onDelete(e: ChamberEvent) {
    if (!confirm(`Delete "${e.title}"? This also removes its registrations.`)) return;
    const res = await deleteEvent(e.slug);
    if (res.ok) router.refresh();
    else alert(res.error);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-900">Events</h1>
          <p className="text-sm text-muted">Create, edit, and manage events. {events.length} total.</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"><Plus className="h-4 w-4" /> Create event</button>
      </div>

      <Panel title="All events">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                <th className="py-3 font-medium">Event</th>
                <th className="py-3 font-medium">Date</th>
                <th className="py-3 font-medium">Program</th>
                <th className="py-3 font-medium">Registered</th>
                <th className="py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {sorted.map((e) => (
                <tr key={e.slug} className="hover:bg-brand-50/40">
                  <td className="py-3 font-medium text-brand-900">{e.title}</td>
                  <td className="py-3 text-ink-soft">{formatDate(e.start, { month: "short", day: "numeric", year: "numeric" })}</td>
                  <td className="py-3"><Badge tone="neutral">{programName(e.program)}</Badge></td>
                  <td className="py-3"><span className="flex items-center gap-1 text-ink-soft"><Users className="h-3.5 w-3.5" /> {e.registered}/{e.capacity}</span></td>
                  <td className="py-3">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(e)} className="rounded-lg p-1.5 text-muted hover:bg-brand-50 hover:text-brand-600" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => onDelete(e)} className="rounded-lg p-1.5 text-muted hover:bg-danger-soft hover:text-danger" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {sorted.length === 0 && <p className="py-8 text-center text-sm text-muted">No events yet. Click “Create event”.</p>}
      </Panel>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Edit event" : "Create event"}>
        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
          <Field label="Title" name="title" defaultValue={editing?.title} required full />
          <Select label="Program" name="programSlug" defaultValue={editing?.program} options={[{ value: "", label: "— none —" }, ...programs.map((p) => ({ value: p.slug, label: p.name }))]} />
          <Field label="Hue (color 0–360)" name="hue" type="number" defaultValue={editing?.hue ?? 150} />
          <Field label="Start" name="start" type="datetime-local" defaultValue={toLocalInput(editing?.start)} required />
          <Field label="End (optional)" name="end" type="datetime-local" defaultValue={toLocalInput(editing?.end)} />
          <Field label="Location" name="location" defaultValue={editing?.location} />
          <Field label="Address" name="address" defaultValue={editing?.address} />
          <Field label="Price ($, 0 = free)" name="priceDollars" type="number" defaultValue={editing ? editing.price / 100 : 0} />
          <Field label="Capacity" name="capacity" type="number" defaultValue={editing?.capacity ?? 100} />
          <Field label="Short summary" name="summary" defaultValue={editing?.summary} full />
          <TextArea label="Description" name="description" defaultValue={editing?.description} rows={4} />
          <label className="flex items-center gap-2 text-sm text-ink-soft sm:col-span-2">
            <input type="checkbox" name="membersOnly" defaultChecked={editing?.membersOnly} className="h-4 w-4 rounded border-line accent-brand-500" />
            Members-only event
          </label>

          {error && <p className="rounded-xl bg-danger-soft px-3 py-2 text-sm text-danger sm:col-span-2">{error}</p>}

          <div className="flex justify-end gap-2 sm:col-span-2">
            <button type="button" onClick={() => setOpen(false)} className="rounded-xl border border-line px-4 py-2 text-sm font-medium text-ink-soft hover:bg-brand-50">Cancel</button>
            <button type="submit" disabled={busy} className="flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-60">
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}{editing ? "Save changes" : "Create event"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
