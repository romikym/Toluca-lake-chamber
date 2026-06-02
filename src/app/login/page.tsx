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
    <section className="relative isolate flex min-h-[100dvh] items-center overflow-hidden py-28">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, #00563f 0%, #003726 38%, #001d16 78%)",
        }}
      />
      <div className="aurora aurora-a animate-float-slow h-[420px] w-[420px] -top-32 -left-24" />
      <div className="aurora aurora-b animate-float-slower h-[460px] w-[460px] top-10 -right-32" />
      <Container className="relative max-w-md">
        <div className="glass-strong rounded-[36px] p-9 shadow-luxe">
          <div className="flex justify-center"><Logo /></div>
          <h1 className="mt-7 text-center font-display text-3xl font-bold text-brand-900">Welcome back</h1>
          <p className="mt-2 text-center text-sm leading-relaxed text-muted">
            Manage your Chamber membership all in one place. Update your business
            information, manage your directory listing, upload photos, and stay
            connected with Chamber news and events.
          </p>

          <LoginForm />

          <p className="mt-7 text-center text-sm text-muted">
            Not a member yet?{" "}
            <Link href="/membership/apply" className="font-semibold text-brand-700 transition hover:text-brand-800">
              Join the Chamber
            </Link>
          </p>
        </div>
        <div className="mt-5 rounded-2xl glass-dark p-4 text-center text-xs text-white/70 luxe-edge-dark">
          <p className="font-semibold text-white">Demo accounts</p>
          <p className="mt-1">Admin: <code className="text-spring">admin@tolucalakechamber.com</code> / <code className="text-spring">admin123</code></p>
          <p>Member: <code className="text-spring">taylor@compass.com</code> / <code className="text-spring">member123</code></p>
        </div>
      </Container>
    </section>
  );
}
