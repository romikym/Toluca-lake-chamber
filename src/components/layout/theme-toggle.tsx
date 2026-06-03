"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Minimal dark/light toggle. The no-flash init runs in layout (THEME_INIT). */
export function ThemeToggle({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const el = document.documentElement;
    const next = !el.classList.contains("dark");
    el.classList.toggle("dark", next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
    setDark(next);
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border transition active:scale-[0.94]",
        tone === "dark"
          ? "border-white/25 bg-white/10 text-white hover:bg-white/20"
          : "border-line bg-surface/70 text-ink-soft hover:text-brand-700",
        className
      )}
    >
      {mounted && dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
    </button>
  );
}

/** Inline script string — set the class before paint to avoid a flash of the wrong theme. */
export const THEME_INIT = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;
