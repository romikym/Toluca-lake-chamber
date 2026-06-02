"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="card-glass divide-y divide-line/60 overflow-hidden rounded-3xl">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className={cn("flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors", isOpen ? "bg-brand-50/40" : "hover:bg-brand-50/30")}
              aria-expanded={isOpen}
            >
              <span className="font-display text-[17px] font-semibold leading-snug text-brand-900">{item.q}</span>
              <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200", isOpen ? "btn-gradient rotate-45 text-white" : "bg-brand-50 text-brand-700")}>
                <Plus className="h-4 w-4" strokeWidth={2.5} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink-soft">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
