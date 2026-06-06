"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button, ButtonLink } from "@/components/ui/button";
import { SwanMark } from "@/components/brand/logo";

/** Route-level error boundary — on-brand 500 with recovery, replaces the default Next error screen. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface for logging/observability.
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center">
      <Container className="max-w-lg text-center">
        <SwanMark className="mx-auto h-16 w-16 text-brand-300" />
        <h1 className="mt-6 font-display text-4xl font-bold text-brand-900">Something went sideways</h1>
        <p className="mt-3 text-lg text-ink-soft">
          A small hiccup on our end &mdash; not you. Try again, or head back to the Village.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button onClick={reset}>Try again</Button>
          <ButtonLink href="/" variant="secondary">Back home</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
