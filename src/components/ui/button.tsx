import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "glass"
  | "glass-dark"
  | "subtle"
  | "danger";
type Size = "sm" | "md" | "lg" | "xl";

const base =
  "group/btn inline-flex items-center justify-center gap-2 font-semibold rounded-full tracking-[0.005em] " +
  "transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-500 " +
  "disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97] whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "btn-gradient shimmer-on-hover text-white hover:-translate-y-0.5",
  secondary: "bg-white text-brand-900 ring-1 ring-line-strong hover:ring-brand-300 hover:-translate-y-0.5 shadow-sm hover:shadow-md",
  tertiary: "text-brand-700 hover:text-brand-800 hover:bg-brand-50",
  glass: "glass luxe-edge text-brand-900 hover:bg-white/75 hover:-translate-y-0.5 shadow-glass",
  "glass-dark": "btn-ghost-dark hover:-translate-y-0.5",
  subtle: "bg-brand-50 text-brand-800 hover:bg-brand-100",
  danger: "bg-danger text-white hover:brightness-95 shadow-sm",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-[52px] px-8 text-[15px]",
  xl: "h-[60px] px-10 text-base",
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
}: CommonProps & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const external = href.startsWith("http");
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn(base, variants[variant], sizes[size], className)} {...props}>
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
