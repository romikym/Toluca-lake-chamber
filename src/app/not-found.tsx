import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { SwanMark } from "@/components/brand/logo";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center">
      <Container className="max-w-lg text-center">
        <SwanMark className="mx-auto h-16 w-16 text-brand-300" />
        <h1 className="mt-6 font-display text-5xl font-bold text-brand-900">404</h1>
        <p className="mt-3 text-lg text-ink-soft">
          We couldn&apos;t find that page in the Village. Let&apos;s get you back home.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href="/">Back home</ButtonLink>
          <ButtonLink href="/directory" variant="secondary">Browse directory</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
