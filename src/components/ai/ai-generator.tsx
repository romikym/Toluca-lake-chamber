"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2, Copy, Check, RefreshCw, Send } from "lucide-react";
import { saveAiDraft } from "@/app/actions/ai";
import { cn } from "@/lib/utils";

export type AiTool = { key: string; label: string; desc: string; placeholder: string; build: (input: string) => string };

export function AiGenerator({ tools, allowDraft = false }: { tools: AiTool[]; allowDraft?: boolean }) {
  const [active, setActive] = useState(tools[0]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  async function saveDraft() {
    await saveAiDraft({ feature: active.key, title: active.label, content: output });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function generate() {
    if (!input.trim()) return;
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: active.build(input) }], feature: active.key }),
      });
      const data = await res.json();
      setOutput(data.reply);
    } catch {
      setOutput("Something went wrong generating content. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function copy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* Tool picker */}
      <div className="space-y-2">
        {tools.map((t) => (
          <button
            key={t.key}
            onClick={() => { setActive(t); setOutput(""); }}
            className={cn(
              "w-full rounded-2xl border p-4 text-left transition-all",
              active.key === t.key ? "border-brand-400 bg-brand-50 ring-2 ring-brand-200" : "border-line bg-surface hover:border-brand-300"
            )}
          >
            <div className="flex items-center gap-2 font-medium text-brand-900">
              <Sparkles className="h-4 w-4 text-brand-500" /> {t.label}
            </div>
            <p className="mt-1 text-xs text-muted">{t.desc}</p>
          </button>
        ))}
      </div>

      {/* Workspace */}
      <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
        <h3 className="font-display text-lg font-semibold text-brand-900">{active.label}</h3>
        <p className="text-sm text-muted">{active.desc}</p>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          placeholder={active.placeholder}
          className="mt-4 w-full rounded-xl border border-line bg-canvas p-4 text-sm outline-none focus:border-brand-500 focus:bg-surface"
        />
        <button
          onClick={generate}
          disabled={loading || !input.trim()}
          className="mt-3 flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-600 disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? "Generating…" : "Generate with AI"}
        </button>

        {output && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-xl border border-line bg-canvas p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-500">Draft</span>
              <div className="flex gap-2">
                <button onClick={generate} className="flex items-center gap-1 text-xs text-muted hover:text-brand-600"><RefreshCw className="h-3 w-3" /> Regenerate</button>
                <button onClick={copy} className="flex items-center gap-1 text-xs text-muted hover:text-brand-600">
                  {copied ? <><Check className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
                </button>
                {allowDraft && (
                  <button onClick={saveDraft} className="flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700">
                    {saved ? <><Check className="h-3 w-3" /> Saved</> : <><Send className="h-3 w-3" /> Save for approval</>}
                  </button>
                )}
              </div>
            </div>
            <p className="whitespace-pre-line text-sm leading-relaxed text-ink-soft">{output}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
