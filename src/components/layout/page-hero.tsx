import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";

// Serene Toluca-Lake-evoking scenery. Drop a real photo into
// /public/images/heroes/<name>.jpg and pass `image="/images/heroes/<name>.jpg"`
// to override per page (local files take priority over the remote default).
const DEFAULT_HERO =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1900&q=80";

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  image = DEFAULT_HERO,
  size = "default",
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  hue?: number;
  image?: string;
  size?: "default" | "tall";
  breadcrumb?: { label: string; href?: string }[];
  children?: React.ReactNode;
}) {
  const tall = size === "tall";
  return (
    <section
      className={
        tall
          ? "relative isolate flex min-h-[82vh] items-end overflow-hidden pt-36 pb-16 sm:pb-20 lg:min-h-[88vh] lg:pb-28"
          : "relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-44 lg:pb-32"
      }
    >      <div
        aria-hidden
        className="hero-kenburns absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(110deg, rgba(0,18,13,0.93) 0%, rgba(0,42,30,0.78) 46%, rgba(0,30,22,0.5) 100%)," +
            `url('${image}'),` +
            "radial-gradient(110% 80% at 50% 0%, #00563f 0%, #003726 38%, #001d16 78%)",
        }}
      />
      {/* Aurora orbs — mix of emerald, lake, and sunset for warmth + depth */}
      <div className="aurora aurora-a animate-float-slow h-[420px] w-[420px] -top-32 -left-24" />
      <div className="aurora aurora-lake animate-float-slower h-[460px] w-[460px] top-10 -right-32" />
      <div className="aurora aurora-c h-[260px] w-[260px] bottom-0 left-1/3 animate-pulse-glow" />
      <div className="aurora aurora-sunset h-[300px] w-[300px] top-1/2 left-1/2 animate-float-slow opacity-25" />
      <div className="aurora aurora-twilight h-[220px] w-[220px] -bottom-10 right-1/4 animate-float-slower" />
      {/* Champagne-copper warmth — the gold accent in the ambient field */}
      <div
        aria-hidden
        className="aurora animate-float-slower h-[280px] w-[280px] bottom-6 left-1/4 opacity-[0.18]"
        style={{ background: "radial-gradient(circle, var(--color-gold) 0%, transparent 70%)" }}
      />

      {/* Glass arcs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-20 hidden h-[560px] w-[560px] rounded-full border border-white/10 lg:block"
        style={{ background: "linear-gradient(110deg, rgba(255,255,255,0.05), rgba(255,255,255,0.0))" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-80 top-0 hidden h-[760px] w-[760px] rounded-full border border-white/8 lg:block"
        style={{ background: "linear-gradient(110deg, rgba(186,242,209,0.06), rgba(255,255,255,0.0))" }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{ background: "linear-gradient(180deg, transparent, var(--color-canvas) 95%)" }}
      />

      <Container className="relative">
        {breadcrumb && (
          <nav className="mb-7 flex items-center gap-1.5 text-xs text-white/70">
            {breadcrumb.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {c.href ? (
                  <Link href={c.href} className="transition hover:text-white">{c.label}</Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
                {i < breadcrumb.length - 1 && <ChevronRight className="h-3 w-3 opacity-60" />}
              </span>
            ))}
          </nav>
        )}
        <Reveal>
          {eyebrow && <Eyebrow tone="dark">{eyebrow}</Eyebrow>}
          {/* Champagne-gold hairline flourish — the members-club detail */}
          <div
            aria-hidden
            className="mt-6 h-px w-20 rounded-full"
            style={{ background: "linear-gradient(90deg, var(--color-gold-bright), var(--color-copper) 60%, transparent)" }}
          />
          {typeof title === "string" ? (
            <TextReveal
              as="h1"
              text={title}
              className={
                tall
                  ? "mt-5 block max-w-5xl font-display text-[3rem] font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-[4.2rem] lg:text-[5.4rem] text-balance"
                  : "mt-5 block max-w-4xl font-display text-[2.6rem] font-semibold leading-[1.05] text-white sm:text-[3.4rem] lg:text-[4.2rem] text-balance"
              }
            />
          ) : (
            <h1 className="mt-5 max-w-4xl font-display text-[2.6rem] font-semibold leading-[1.05] text-white sm:text-[3.4rem] lg:text-[4.2rem] text-balance">
              {title}
            </h1>
          )}
          {description && (
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/85 text-balance">
              {description}
            </p>
          )}
          {children && <div className="mt-9">{children}</div>}
        </Reveal>
      </Container>
    </section>
  );
}
