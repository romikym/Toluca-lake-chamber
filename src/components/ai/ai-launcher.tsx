"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X, Send, Loader2 } from "lucide-react";
import { SwanMark } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "How do I join the Chamber?",
  "What events are coming up?",
  "Find me a local restaurant",
  "What are the membership tiers?",
];

export function AiLauncher() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm the Toluca Lake Chamber assistant 🦢 Ask me about membership, events, local businesses, or anything about the Village.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry — I had trouble responding. Please try again." },
      ]);
    } finally {
      setLoading(false);
      requestAnimationFrame(() => scrollRef.current?.scrollTo({ top: 9e9, behavior: "smooth" }));
    }
  }

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#2a7fb8] text-white shadow-lg transition hover:bg-[#1c5d87] hover:scale-105 lg:bottom-6 lg:right-6",
          open && "pointer-events-none opacity-0"
        )}
        aria-label="Open the Chamber AI assistant"
      >
        <Sparkles className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed bottom-4 right-4 z-50 flex h-[70dvh] max-h-[600px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-lg lg:bottom-6 lg:right-6"
          >
            <header className="flex items-center justify-between bg-brand-800 px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <SwanMark className="h-7 w-7 text-white" />
                <div>
                  <p className="text-sm font-semibold leading-none">Chamber Assistant</p>
                  <p className="text-[11px] text-white/60">Powered by Claude</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-1 hover:bg-white/10">
                <X className="h-5 w-5" />
              </button>
            </header>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-canvas p-4">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      m.role === "user"
                        ? "bg-[#2a7fb8] text-white"
                        : "border border-line bg-surface text-ink-soft"
                    )}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl border border-line bg-surface px-3.5 py-2.5 text-sm text-muted">
                    <Loader2 className="h-4 w-4 animate-spin" /> Thinking…
                  </div>
                </div>
              )}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-brand-200 bg-white px-3 py-1.5 text-xs text-brand-700 hover:bg-brand-50"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-line bg-surface p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the Chamber…"
                className="h-10 w-full rounded-xl border border-line bg-canvas px-3.5 text-sm outline-none focus:border-brand-500"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2a7fb8] text-white transition hover:bg-[#236d9f] disabled:opacity-50"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
