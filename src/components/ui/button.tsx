import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "tertiary" | "glass" | "subtle" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white shadow-sm hover:bg-brand-600 hover:shadow-md hover:-translate-y-px",
  secondary:
    "border border-brand-200 bg-white text-brand-700 hover:border-brand-300 hover:bg-brand-50 shadow-xs",
  tertiary: "text-brand-600 hover:text-brand-700 hover:bg-brand-50",
  glass: "glass text-brand-900 hover:bg-white/70 shadow-glass",
  subtle: "bg-brand-50 text-brand-700 hover:bg-brand-100",
  danger: "bg-danger text-white hover:brightness-95 shadow-sm",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
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
