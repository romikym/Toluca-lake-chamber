"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      role="switch"
      aria-checked={on}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        on ? "bg-brand-500" : "bg-line-strong"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
          on ? "translate-x-[22px]" : "translate-x-0.5"
        )}
      />
    </button>
  );
}
