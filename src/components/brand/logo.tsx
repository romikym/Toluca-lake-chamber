import Link from "next/link";
import { cn } from "@/lib/utils";

export function SwanMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-9 w-9", className)}
      role="img"
      aria-label="Toluca Lake Chamber swan"
      fill="none"
    >
      {/* Swan silhouette — raised wing (left), graceful neck & head to the right */}
      <path
        d="M12 46 C10 35 12 24 18 20 C20 22 21 25 22 27 C26 22 31 19 34 22 C34 17 39 13 46 14 C49 14 51 16 51 18 L57 18 L51 20 C50 24 47 27 44 30 C42 37 37 45 27 46 L12 46 Z"
        fill="currentColor"
      />
      {/* Eye (negative space) */}
      <circle cx="48" cy="17" r="0.9" fill="white" opacity="0.85" />
      {/* Water ripples */}
      <path
        d="M8 53q4-3 8 0t8 0 8 0 8 0 8 0M14 58q4-3 8 0t8 0 8 0 8 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}

export function Logo({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "light";
}) {
  const isLight = variant === "light";
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="Toluca Lake Chamber of Commerce — home"
    >
      <SwanMark
        className={cn(
          "h-9 w-9 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5",
          isLight ? "text-white" : "text-brand-600"
        )}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[15px] font-semibold tracking-tight",
            isLight ? "text-white" : "text-brand-800"
          )}
        >
          TOLUCA LAKE
        </span>
        <span
          className={cn(
            "font-display text-[11px] tracking-wide",
            isLight ? "text-white/80" : "text-brand-500"
          )}
        >
          Chamber of Commerce
        </span>
      </span>
    </Link>
  );
}
