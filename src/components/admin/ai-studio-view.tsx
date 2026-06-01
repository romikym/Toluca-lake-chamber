"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, FileText, TrendingUp, AlertCircle, Check, X, Clock } from "lucide-react";
import { AiGenerator, type AiTool } from "@/components/ai/ai-generator";
import { Panel, StatTile } from "@/components/dashboard/widgets";
import { Badge } from "@/components/ui/badge";
import { reviewAiDraft } from "@/app/actions/ai";

const tools: AiTool[] = [
  { key: "newsletter", label: "Newsletter draft", desc: "Monthly community newsletter.", placeholder: "Highlights to include: upcoming events, new members, a spotlight…", build: (i) => `Write a warm monthly newsletter for the Toluca Lake Chamber of Commerce including these highlights: ${i}` },
  { key: "spotlight", label: "Member spotlight", desc: "Feature a member business.", placeholder: "Business name and a few notes about them…", build: (i) => `Write a friendly member spotlight feature (about 120 words) for the Toluca Lake Chamber about: ${i}` },
  { key: "sponsor", label: "Sponsor proposal", desc: "Pitch a sponsorship.", placeholder: "Prospective sponsor and the event/opportunity…", build: (i) => `Write a persuasive but warm sponsorship proposal for a Toluca Lake Chamber event: ${i}` },
  { key: "press", label: "Press release", desc: "Official announcement.", placeholder: "Key details of the announcement…", build: (i) => `Write a professional press release for the Toluca Lake Chamber of Commerce about: ${i}` },
  { key: "trends", label: "Membership analysis", desc: "Insights & recommendations.", placeholder: "Paste membership numbers or describe trends…", build: (i) => `As a chamber operations analyst, summarize trends and recommend 3 engagement strategies based on: ${i}` },
];

type Draft = { id: string; feature: string; title: string; content: string; status: string; author: string | null; createdAt: string | Date };

export function AiStudioView({ stats, drafts }: { stats: { generations: number; pendingDrafts: number }; drafts: Draft[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function review(id: string, decision: "APPROVED" | "REJECTED") {
    setBusy(id);
    await reviewAiDraft(id, decision);
    setBusy(null);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-brand-900">AI Studio</h1>
        <p className="text-sm text-muted">Generate content with Claude. Drafts route to review before publishing.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile icon={Sparkles} label="AI generations logged" value={stats.generations} delta="all time" deltaTone="up" />
        <StatTile icon={FileText} label="Drafts pending review" value={stats.pendingDrafts} delta={stats.pendingDrafts ? "review" : "clear"} deltaTone="flat" />
        <StatTile icon={TrendingUp} label="Monthly AI budget" value={100} prefix="$" delta="cap" deltaTone="flat" />
      </div>

      <Panel title="Content generator">
        <AiGenerator tools={tools} allowDraft />
      </Panel>

      <Panel title="Approval queue">
        {drafts.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted">No drafts yet. Generate content above and “Save for approval”.</p>
        ) : (
          <ul className="space-y-3">
            {drafts.map((d) => (
              <li key={d.id} className="rounded-xl border border-line p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-brand-900">{d.title}</span>
                      <Badge tone={d.status === "APPROVED" ? "success" : d.status === "REJECTED" ? "danger" : "info"}>
                        {d.status === "PENDING" && <Clock className="h-3 w-3" />} {d.status[0] + d.status.slice(1).toLowerCase()}
                      </Badge>
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">{d.content}</p>
                  </div>
                  {d.status === "PENDING" && (
                    <div className="flex shrink-0 gap-1">
                      <button disabled={busy === d.id} onClick={() => review(d.id, "APPROVED")} className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600 hover:bg-brand-100 disabled:opacity-50" aria-label="Approve"><Check className="h-4 w-4" /></button>
                      <button disabled={busy === d.id} onClick={() => review(d.id, "REJECTED")} className="flex h-8 w-8 items-center justify-center rounded-lg bg-danger-soft text-danger hover:brightness-95 disabled:opacity-50" aria-label="Reject"><X className="h-4 w-4" /></button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <div className="flex items-start gap-3 rounded-2xl border border-line bg-brand-50/60 p-5 text-sm text-ink-soft">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
        <p>All AI generations are logged to the database for usage tracking. Publishable content enters this approval queue before going live. Add an <code className="rounded bg-white px-1">ANTHROPIC_API_KEY</code> to enable full Claude output.</p>
      </div>
    </div>
  );
}
