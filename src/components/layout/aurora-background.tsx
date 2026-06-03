/**
 * Site-wide ambient background — intentionally minimal: a whisper-faint green
 * tint at the very top (behind the dark heroes) and a subtle dot-grid texture.
 * No glowing orbs over content.
 */
export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(120% 55% at 50% -25%, rgba(0,167,109,0.05), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 bg-grid opacity-40" />
    </div>
  );
}
