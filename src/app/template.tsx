"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Subtle Apple-style route transition. Opacity-only (no transform) so it never
 * creates a containing block that would break sticky/fixed descendants.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
