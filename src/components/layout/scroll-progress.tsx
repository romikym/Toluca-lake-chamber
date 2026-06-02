"use client";

import { useEffect, useState } from "react";

/** Thin signature-gradient progress bar that tracks page scroll. */
export function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = document.documentElement;
    const update = () => {
      const max = el.scrollHeight - el.clientHeight;
      setP(max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2.5px]" aria-hidden>
      <div
        className="h-full origin-left bg-[linear-gradient(90deg,#00a76d,#1eb6a4_35%,#3aa6e6_70%,#7866d9)] shadow-[0_0_12px_rgba(0,167,109,0.6)]"
        style={{ transform: `scaleX(${p})`, transition: "transform 120ms linear" }}
      />
    </div>
  );
}
