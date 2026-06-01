import { Plus, FileText, Mail } from "lucide-react";
import { Panel } from "@/components/dashboard/widgets";
import { Badge } from "@/components/ui/badge";
import { adminContent } from "@/server/admin";
import { formatDate } from "@/lib/utils";

export default async function AdminContent() {
  const { articles, submissions } = await adminContent();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-900">Content</h1>
          <p className="text-sm text-muted">Articles, spotlights, and recent submissions.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"><Plus className="h-4 w-4" /> New post</button>
      </div>

      <Panel title="Published spotlights">
        {articles.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted">No articles yet.</p>
        ) : (
          <ul className="divide-y divide-line">
            {articles.map((a) => (
              <li key={a.slug} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-brand-500" />
                  <span className="font-medium text-brand-900">{a.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge tone={a.status === "PUBLISHED" ? "success" : "neutral"}>{a.status[0] + a.status.slice(1).toLowerCase()}</Badge>
                  <span className="text-xs text-muted">{formatDate(a.date)}</span>
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
                    <p className="font-medium text-brand-900">{[s.firstName, s.lastName].filter(Boolean).join(" ") || s.email}</p>
                    <p className="text-xs text-muted">{s.interest ?? "General"} · {formatDate(s.createdAt)}</p>
                  </div>
                </div>
                <Badge tone={s.handled ? "success" : "info"}>{s.handled ? "Handled" : "New"}</Badge>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
