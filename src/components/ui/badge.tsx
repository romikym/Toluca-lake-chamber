import { cn } from "@/lib/utils";

type Tone = "brand" | "neutral" | "success" | "warning" | "danger" | "info" | "premium" | "spring" | "outline";

const tones: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-700 border-brand-200",
  neutral: "bg-white/70 text-ink-soft border-line backdrop-blur",
  success: "bg-brand-50 text-brand-700 border-brand-200",
  warning: "bg-[#f6efe0] text-warning border-[#ecdcbd]",
  danger: "bg-danger-soft text-danger border-[#f1d6d6]",
  info: "bg-[#e7f0f4] text-info border-[#d2e3ea]",
  premium: "text-white border-transparent bg-[linear-gradient(135deg,#5be2a1_0%,#1cd693_45%,#006a44_100%)] shadow-[0_8px_18px_-6px_rgba(0,167,109,0.55)]",
  spring: "bg-[linear-gradient(120deg,rgba(186,242,209,0.85),rgba(255,255,255,0.7))] text-brand-800 border-brand-200",
  outline: "bg-transparent text-brand-800 border-brand-300",
};

export function Badge({ tone = "neutral", className, children }: { tone?: Tone; className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide", tones[tone], className)}>
      {children}
    </span>
  );
}
