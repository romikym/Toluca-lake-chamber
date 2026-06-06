"use client";

/**
 * Global error boundary — catches failures in the root layout itself, so it must
 * render its own <html>/<body> and rely on inline styles (no app CSS guaranteed).
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
          background: "radial-gradient(120% 100% at 50% 0%, #00563f 0%, #003726 45%, #001d16 100%)",
          color: "#f8f7f3",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: "30rem" }}>
          <p style={{ letterSpacing: "0.2em", textTransform: "uppercase", fontSize: 12, color: "#5be2a1", fontWeight: 700 }}>
            Toluca Lake Chamber
          </p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: 40, margin: "16px 0 8px", fontWeight: 600 }}>
            Something went wrong
          </h1>
          <p style={{ opacity: 0.8, lineHeight: 1.6 }}>
            We hit an unexpected error. Please try again in a moment.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: 24,
              padding: "12px 28px",
              borderRadius: 999,
              border: "none",
              background: "#2a7fb8",
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
