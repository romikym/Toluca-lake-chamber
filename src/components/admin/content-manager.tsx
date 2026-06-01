"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Loader2, FileText, Mail } from "lucide-react";
import { Panel } from "@/components/dashboard/widgets";
import { Badge } from "@/components/ui/badge";
import { Modal, Field, TextArea, Select } from "@/components/ui/modal";
import { saveArticle, deleteArticle } from "@/app/actions/admin";
import { formatDate } from "@/lib/utils";

type Article = { slug: string; title: string; excerpt: string; date: string; type: string; status: string; hue: number };
type Submission = { id: string; name: string; interest: string; date: string; handled: boolean };

const typeLabel = (t: string) => t[0] + t.slice(1).toLowerCase();

export function ContentManager({ articles, submissions }: { articles: Article[]; submissions: Submission[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Article | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function openCreate() { setEditing(null); setError(null); setOpen(true); }
  function openEdit(a: Article) { setEditing(a); setError(null); setOpen(true); }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    setBusy(true); setError(null);
    const res = await saveArticle({
      slug: editing?.slug,
      title: String(fd.get("title") ?? ""),
      excerpt: String(fd.get("excerpt") ?? ""),
      date: String(fd.get("date") ?? ""),
      type: String(fd.get("type") ?? "SPOTLIGHT"),
      status: String(fd.get("status") ?? "PUBLISHED"),
      hue: Number(fd.get("hue") ?? 150),
    });
    setBusy(false);
    if (res.ok) { setOpen(false); router.refresh(); }
    else setError(res.error ?? "Something went wrong.");
  }

  async function onDelete(a: Article) {
    if (!confirm(`Delete "${a.title}"?`)) return;
    const res = await deleteArticle(a.slug);
    if (res.ok) router.refresh(); else alert(res.error);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-900">Content</h1>
          <p className="text-sm text-muted">Spotlights, news, and announcements.</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"><Plus className="h-4 w-4" /> New post</button>
      </div>

      <Panel title="Posts">
        {articles.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted">No posts yet. Click “New post”.</p>
        ) : (
          <ul className="divide-y divide-line">
            {articles.map((a) => (
              <li key={a.slug} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-brand-500" />
                  <div>
                    <p className="font-medium text-brand-900">{a.title}</p>
                    <p className="text-xs text-muted">{typeLabel(a.type)} · {formatDate(a.date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={a.status === "PUBLISHED" ? "success" : "neutral"}>{typeLabel(a.status)}</Badge>
                  <button onClick={() => openEdit(a)} className="rounded-lg p-1.5 text-muted hover:bg-brand-50 hover:text-brand-600" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => onDelete(a)} className="rounded-lg p-1.5 text-muted hover:bg-danger-soft hover:text-danger" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title="Recent contact submissions">
        {submissions.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted">No submissions yet.</p>
        ) : (
          <ul className="divide-y divide-line">
            {submissions.map((s) => (
              <li key={s.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Mail className="h-4 w-4" /></span>
                  <div>
                    <p className="font-medium text-brand-900">{s.name}</p>
                    <p className="text-xs text-muted">{s.interest} · {formatDate(s.date)}</p>
                  </div>
                </div>
                <Badge tone={s.handled ? "success" : "info"}>{s.handled ? "Handled" : "New"}</Badge>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Edit post" : "New post"}>
        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
          <Field label="Title" name="title" defaultValue={editing?.title} required full />
          <TextArea label="Excerpt / summary" name="excerpt" defaultValue={editing?.excerpt} rows={3} />
          <Field label="Date" name="date" type="date" defaultValue={(editing?.date ?? new Date().toISOString()).slice(0, 10)} />
          <Field label="Hue (color 0–360)" name="hue" type="number" defaultValue={editing?.hue ?? 150} />
          <Select label="Type" name="type" defaultValue={editing?.type ?? "SPOTLIGHT"} options={["SPOTLIGHT", "NEWS", "PRESS"].map((t) => ({ value: t, label: typeLabel(t) }))} />
          <Select label="Status" name="status" defaultValue={editing?.status ?? "PUBLISHED"} options={["PUBLISHED", "DRAFT", "PENDING", "ARCHIVED"].map((s) => ({ value: s, label: typeLabel(s) }))} />

          {error && <p className="rounded-xl bg-danger-soft px-3 py-2 text-sm text-danger sm:col-span-2">{error}</p>}
          <div className="flex justify-end gap-2 sm:col-span-2">
            <button type="button" onClick={() => setOpen(false)} className="rounded-xl border border-line px-4 py-2 text-sm font-medium text-ink-soft hover:bg-brand-50">Cancel</button>
            <button type="submit" disabled={busy} className="flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-60">
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}{editing ? "Save changes" : "Publish post"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
