import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { gradientStyle } from "@/components/ui/gradient";

export function PageHero({
  eyebrow,
  title,
  description,
  hue = 150,
  breadcrumb,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  hue?: number;
  breadcrumb?: { label: string; href?: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden" style={gradientStyle(hue)}>
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute -right-16 -top-12 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <Container className="relative py-16 sm:py-20">
        {breadcrumb && (
          <nav className="mb-5 flex items-center gap-1 text-xs text-white/70">
            {breadcrumb.map((c, i) => (
              <span key={i} className="flex items-center gap-1">
                {c.href ? (
                  <Link href={c.href} className="hover:text-white">{c.label}</Link>
                ) : (
                  <span className="text-white/90">{c.label}</span>
                )}
                {i < breadcrumb.length - 1 && <ChevronRight className="h-3 w-3" />}
              </span>
            ))}
          </nav>
        )}
        <Reveal>
          {eyebrow && <Eyebrow className="text-white/80">{eyebrow}</Eyebrow>}
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold text-white sm:text-5xl text-balance">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85 text-balance">
              {description}
            </p>
          )}
          {children && <div className="mt-7">{children}</div>}
        </Reveal>
      </Container>
    </section>
  );
}
