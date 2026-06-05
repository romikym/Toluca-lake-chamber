"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { footerNav, site } from "@/lib/site";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/portal") || pathname.startsWith("/admin")) return null;

  return (
    <footer
      className="relative isolate mt-24 overflow-hidden text-white/80"
      style={{ background: "radial-gradient(120% 100% at 50% 0%, #00563f 0%, #003726 38%, #001d16 80%)" }}
    >
      <div className="aurora aurora-b h-[420px] w-[420px] -top-32 -left-24" />
      <div className="aurora aurora-c h-[340px] w-[340px] -bottom-20 right-10" />
      <div className="aurora aurora-lake h-[300px] w-[300px] top-1/2 left-1/3 animate-float-slower opacity-30" />
      <div className="aurora aurora-twilight h-[260px] w-[260px] bottom-20 left-10 animate-float-slow opacity-25" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-spring/40 to-transparent" />
      <div className="absolute inset-x-0 top-px h-px bg-gradient-to-r from-transparent via-[#c7a867]/35 to-transparent" />

      <Container className="relative py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/72">
              {site.description}
            </p>
            <div className="mt-7 space-y-3 text-sm">
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 transition hover:text-white">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 ring-1 ring-white/12">
                  <Mail className="h-4 w-4 text-spring" />
                </span>
                {site.email}
              </a>
              <a href={site.phoneHref} className="flex items-center gap-3 transition hover:text-white">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 ring-1 ring-white/12">
                  <Phone className="h-4 w-4 text-spring" />
                </span>
                {site.phone}
              </a>
              <p className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 ring-1 ring-white/12">
                  <MapPin className="h-4 w-4 text-spring" />
                </span>
                {site.address.line1}, {site.address.city}, {site.address.state} {site.address.zip}
              </p>
            </div>
            <div className="mt-7 flex gap-3">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 transition hover:-translate-y-0.5 hover:bg-white/20" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 transition hover:-translate-y-0.5 hover:bg-white/20" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-5">
            {Object.entries(footerNav).map(([heading, links]) => (
              <div key={heading}>
                <h3 className="font-display text-[13px] font-semibold uppercase tracking-[0.15em] text-spring">
                  {heading}
                </h3>
                <ul className="mt-5 space-y-3 text-sm">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-white/72 transition hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display text-[13px] font-semibold uppercase tracking-[0.15em] text-spring">
              Stay in the loop
            </h3>
            <p className="mt-5 text-sm text-white/72">
              Community news, events, and member spotlights, straight to your inbox.
            </p>
            <div className="mt-5">
              <NewsletterForm tone="dark" />
            </div>
          </div>
        </div>

        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-[#c7a867]/30 to-transparent" />
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-white/55 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Built for the community of Toluca Lake.</p>
        </div>
      </Container>
    </footer>
  );
}
