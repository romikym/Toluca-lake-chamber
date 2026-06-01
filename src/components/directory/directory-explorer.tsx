"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import { BusinessCard } from "@/components/cards/business-card";
import { Icon } from "@/components/ui/icon";
import type { Business, Category } from "@/lib/data";
import { cn } from "@/lib/utils";

export function DirectoryExplorer({
  businesses,
  categories,
}: {
  businesses: Business[];
  categories: Category[];
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const categoryName = (key: string) => categories.find((c) => c.key === key)?.name ?? key;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return businesses.filter((b) => {
      const matchesQuery =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.tagline.toLowerCase().includes(q) ||
        categoryName(b.category).toLowerCase().includes(q);
      const matchesCat = !active || b.category === active;
      return matchesQuery && matchesCat;
    });
  }, [query, active]);

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    businesses.forEach((b) => (m[b.category] = (m[b.category] ?? 0) + 1));
    return m;
  }, []);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Filters */}
      <aside className={cn("lg:block", showFilters ? "block" : "hidden")}>
        <div className="lg:sticky lg:top-28">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display font-semibold text-brand-900">Industries</h2>
            {active && (
              <button onClick={() => setActive(null)} className="text-xs text-brand-600 hover:underline">
                Clear
              </button>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => setActive(null)}
              className={cn(
                "flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors",
                !active ? "bg-brand-500 text-white" : "text-ink-soft hover:bg-brand-50"
              )}
            >
              All members <span className="text-xs opacity-70">{businesses.length}</span>
            </button>
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={cn(
                  "flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors",
                  active === c.key ? "bg-brand-500 text-white" : "text-ink-soft hover:bg-brand-50"
                )}
              >
                <span className="flex items-center gap-2">
                  <Icon name={c.icon} className="h-4 w-4 opacity-70" />
                  {c.name}
                </span>
                <span className="text-xs opacity-70">{counts[c.key] ?? 0}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Results */}
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search businesses, services, categories…"
              className="h-11 w-full rounded-xl border border-line bg-surface pl-10 pr-4 text-sm outline-none focus:border-brand-500"
            />
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-4 text-sm font-medium text-ink-soft lg:hidden"
          >
            {showFilters ? <X className="h-4 w-4" /> : <SlidersHorizontal className="h-4 w-4" />}
            Filters
          </button>
          <div className="hidden items-center gap-1 rounded-xl border border-line bg-surface p-1 sm:flex">
            <button onClick={() => setView("grid")} className={cn("flex h-9 w-9 items-center justify-center rounded-lg", view === "grid" ? "bg-brand-100 text-brand-700" : "text-muted")} aria-label="Grid view">
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button onClick={() => setView("list")} className={cn("flex h-9 w-9 items-center justify-center rounded-lg", view === "list" ? "bg-brand-100 text-brand-700" : "text-muted")} aria-label="List view">
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted">
          <span className="font-semibold text-brand-700">{results.length}</span> {active ? categoryName(active) : "member"} {results.length === 1 ? "business" : "businesses"}
        </p>

        <div
          className={cn(
            "mt-5 grid gap-5",
            view === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
          )}
        >
          {results.map((b) => (
            <motion.div
              key={b.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <BusinessCard b={b} />
            </motion.div>
          ))}
        </div>

        {results.length === 0 && (
          <div className="mt-12 rounded-2xl border border-dashed border-line bg-surface p-12 text-center">
            <p className="font-display text-lg font-semibold text-brand-900">No members found</p>
            <p className="mt-1 text-sm text-muted">Try a different search or category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
