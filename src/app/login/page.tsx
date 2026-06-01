import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/brand/logo";
import { LoginForm } from "@/components/forms/login-form";

export const metadata: Metadata = {
  title: "Member Login",
  description: "Access your Toluca Lake Chamber member portal.",
};

export default function LoginPage() {
  return (
    <section className="flex min-h-[70vh] items-center py-16">
      <Container className="max-w-md">
        <div className="rounded-3xl border border-line bg-surface p-8 shadow-sm">
          <div className="flex justify-center"><Logo /></div>
          <h1 className="mt-6 text-center font-display text-2xl font-bold text-brand-900">Welcome back</h1>
          <p className="mt-1 text-center text-sm text-muted">Manage your Chamber membership all in one place — update your business information, manage your directory listing, upload photos, and stay connected with Chamber news and events.</p>

          <LoginForm />

          <p className="mt-6 text-center text-sm text-muted">
            Not a member yet? <Link href="/membership/apply" className="font-medium text-brand-600 hover:underline">Join the Chamber</Link>
          </p>
        </div>
        <div className="mt-4 rounded-xl border border-line bg-surface/60 p-4 text-center text-xs text-muted">
          <p className="font-medium text-ink-soft">Demo accounts</p>
          <p className="mt-1">Admin → <code>admin@tolucalakechamber.com</code> / <code>admin123</code></p>
          <p>Member → <code>taylor@compass.com</code> / <code>member123</code></p>
        </div>
      </Container>
    </section>
  );
}
