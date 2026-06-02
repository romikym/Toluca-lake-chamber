"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
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

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((e) => (
          <motion.div
            key={e.slug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <EventCard e={e} />
          </motion.div>
        ))}
      </div>

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
        "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all",
        active ? "btn-gradient text-white shadow-[0_8px_20px_-6px_rgba(0,167,109,0.5)]" : "glass-strong text-ink-soft hover:text-brand-700 hover:-translate-y-0.5"
      )}
    >
      {children}
    </button>
  );
}
