import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-500",
        className
      )}
    >
      <span className="h-px w-6 bg-brand-300" aria-hidden />
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && <Eyebrow className={align === "center" ? "justify-center" : ""}>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-3xl sm:text-4xl text-balance">{title}</h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-ink-soft text-balance">{description}</p>
      )}
    </Reveal>
  );
}
