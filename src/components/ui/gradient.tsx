import { cn } from "@/lib/utils";

/** Brand-tinted gradient placeholder used where real imagery will go. */
export function gradientStyle(hue: number, soft = false) {
  const h2 = (hue + 18) % 360;
  return {
    backgroundImage: soft
      ? `linear-gradient(135deg, hsl(${hue} 38% 92%), hsl(${h2} 32% 86%))`
      : `linear-gradient(135deg, hsl(${hue} 62% 27%), hsl(${h2} 66% 19%))`,
  } as React.CSSProperties;
}

export function initials(name: string) {
  return name
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function GradientAvatar({
  name,
  hue,
  className,
  rounded = "rounded-2xl",
}: {
  name: string;
  hue: number;
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center font-display font-semibold text-white",
        rounded,
        className
      )}
      style={gradientStyle(hue)}
      aria-hidden
    >
      {initials(name)}
    </div>
  );
}

export function GradientCover({
  name,
  hue,
  className,
  children,
}: {
  name: string;
  hue: number;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)} style={gradientStyle(hue)}>
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute -right-6 -top-8 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
      {children}
    </div>
  );
}
