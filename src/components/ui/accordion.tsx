"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display font-semibold text-brand-900">{item.q}</span>
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-transform duration-300",
                  isOpen && "rotate-45 bg-brand-500 text-white"
                )}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-[15px] leading-relaxed text-ink-soft">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
