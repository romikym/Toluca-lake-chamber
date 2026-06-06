"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * TextReveal — Apple-style kinetic type. Each word rises and fades in on scroll.
 * Honors prefers-reduced-motion (renders plain). Pass plain text only.
 */
export function TextReveal({
  text,
  className,
  as = "span",
  stagger = 0.045,
  delay = 0,
  y = "0.6em",
}: {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  stagger?: number;
  delay?: number;
  y?: string;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  const words = text.split(" ");

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{text}</Tag>;
  }

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: { y, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <MotionTag
      className={cn(className)}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12%" }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <motion.span variants={word} className="inline-block" aria-hidden>
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </MotionTag>
  );
}
