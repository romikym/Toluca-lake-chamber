import { cn } from "@/lib/utils";

type Tone = "default" | "glass" | "elevated" | "ghost";

const tones: Record<Tone, string> = {
  default: "bg-surface border border-line shadow-sm",
  glass: "card-glass",
  elevated: "bg-surface border border-line shadow-lg",
  ghost: "bg-transparent border border-line/60",
};

export function Card({
  className,
  children,
  interactive = false,
  tone = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
  tone?: Tone;
}) {
  return (
    <div className={cn("rounded-3xl", tones[tone], interactive && "card-glass-lift cursor-pointer", className)} {...props}>
      {children}
    </div>
  );
}

export function CardBody({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-7", className)} {...props}>
      {children}
    </div>
  );
}
