/**
 * Site-wide ambient background — a macOS-Tahoe "liquid glass" field of slowly
 * drifting Toluca-green aurora orbs behind every page. Fixed, very low opacity,
 * pointer-events off. Animations pause under prefers-reduced-motion (global rule).
 */
export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base tint — emerald top, lake bottom-right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 100% at 50% -20%, rgba(0,167,109,0.08), transparent 55%)," +
            "radial-gradient(90% 80% at 100% 100%, rgba(58,166,230,0.06), transparent 60%)," +
            "radial-gradient(80% 70% at 0% 90%, rgba(120,102,217,0.05), transparent 60%)",
        }}
      />
      {/* drifting orbs */}
      <div
        className="animate-float-slow absolute -left-[8vw] -top-[12vw] h-[46vw] w-[46vw] rounded-full"
        style={{ background: "radial-gradient(circle, var(--color-spring-bright), transparent 70%)", opacity: 0.26, filter: "blur(90px)" }}
      />
      <div
        className="animate-float-slower absolute -right-[10vw] top-[28vh] h-[42vw] w-[42vw] rounded-full"
        style={{ background: "radial-gradient(circle, var(--color-lake-bright), transparent 70%)", opacity: 0.2, filter: "blur(90px)" }}
      />
      <div
        className="animate-pulse-glow absolute bottom-[-10vw] left-[24vw] h-[36vw] w-[36vw] rounded-full"
        style={{ background: "radial-gradient(circle, var(--color-emerald-bright), transparent 70%)", opacity: 0.2, filter: "blur(90px)" }}
      />
      <div
        className="animate-float-slow absolute right-[26vw] top-[52vh] h-[26vw] w-[26vw] rounded-full"
        style={{ background: "radial-gradient(circle, var(--color-twilight-bright), transparent 70%)", opacity: 0.14, filter: "blur(90px)" }}
      />
      {/* faint dot grid for texture */}
      <div className="absolute inset-0 bg-grid opacity-50" />
    </div>
  );
}
