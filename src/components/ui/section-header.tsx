import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Eyebrow({
  children,
  className,
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span className={cn("eyebrow", tone === "dark" && "eyebrow-dark", className)}>
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
  tone = "light",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2 className={cn("mt-5 text-[2.1rem] sm:text-[2.6rem] lg:text-[3rem] leading-[1.05] text-balance", tone === "dark" && "text-white")}>
        {title}
      </h2>
      {description && (
        <p className={cn("mt-5 text-lg leading-relaxed text-balance", tone === "dark" ? "text-white/80" : "text-ink-soft")}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
