import { cn } from "@/lib/utils";

type Tone = "brand" | "neutral" | "success" | "warning" | "danger" | "info" | "premium";

const tones: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-700 border-brand-100",
  neutral: "bg-canvas text-muted border-line",
  success: "bg-brand-50 text-brand-600 border-brand-100",
  warning: "bg-[#f6efe0] text-warning border-[#ecdcbd]",
  danger: "bg-danger-soft text-danger border-[#f1d6d6]",
  info: "bg-[#e7f0f4] text-info border-[#d2e3ea]",
  premium:
    "bg-gradient-to-r from-brand-700 to-brand-500 text-white border-transparent",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
