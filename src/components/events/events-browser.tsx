"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EventCard } from "@/components/cards/event-card";
import type { ChamberEvent, Program } from "@/lib/data";
import { cn } from "@/lib/utils";

export function EventsBrowser({
  events,
  programs,
}: {
  events: ChamberEvent[];
  programs: Program[];
}) {
  const [program, setProgram] = useState<string | null>(null);

  const sorted = useMemo(
    () => [...events].sort((a, b) => +new Date(a.start) - +new Date(b.start)),
    []
  );
  const filtered = program ? sorted.filter((e) => e.program === program) : sorted;

  return (
    <div>
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
        <Chip active={!program} onClick={() => setProgram(null)}>All events</Chip>
        {programs.map((p) => (
          <Chip key={p.slug} active={program === p.slug} onClick={() => setProgram(p.slug)}>
            {p.name}
          </Chip>
        ))}
      </div>

      <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((e) => (
            <motion.div
              key={e.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <EventCard e={e} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-muted">No events in this program yet — check back soon.</p>
      )}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        active ? "border-brand-500 bg-brand-500 text-white" : "border-line bg-surface text-ink-soft hover:border-brand-300"
      )}
    >
      {children}
    </button>
  );
}
