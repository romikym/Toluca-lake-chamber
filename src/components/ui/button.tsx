import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "tertiary" | "glass" | "subtle" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 font-medium rounded-full tracking-[0.01em] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97] whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "btn-gradient text-white shadow-[0_12px_28px_-8px_rgba(0,167,109,0.45)] hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-8px_rgba(0,167,109,0.55)]",
  secondary:
    "border border-line-strong bg-surface text-brand-800 hover:border-brand-300 hover:bg-brand-50 hover:-translate-y-0.5 shadow-xs",
  tertiary: "text-brand-700 hover:text-brand-800 hover:bg-brand-50",
  glass: "glass luxe-edge text-brand-900 hover:bg-white/75 hover:-translate-y-0.5 shadow-glass",
  subtle: "bg-brand-50 text-brand-700 hover:bg-brand-100",
  danger: "bg-danger text-white hover:brightness-95 shadow-sm",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-[52px] px-8 text-[15px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: CommonProps & { href: string } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href"
  >) {
  const external = href.startsWith("http");
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </Link>
  );
}
