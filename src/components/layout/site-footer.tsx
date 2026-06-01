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
    <footer className="mt-24 bg-brand-900 text-white/80">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              {site.description}
            </p>
            <div className="mt-6 space-y-2.5 text-sm">
              <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 hover:text-white">
                <Mail className="h-4 w-4 text-brand-300" /> {site.email}
              </a>
              <a href={site.phoneHref} className="flex items-center gap-2.5 hover:text-white">
                <Phone className="h-4 w-4 text-brand-300" /> {site.phone}
              </a>
              <p className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-brand-300" />
                {site.address.line1}, {site.address.city}, {site.address.state} {site.address.zip}
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-5">
            {Object.entries(footerNav).map(([heading, links]) => (
              <div key={heading}>
                <h3 className="font-display text-sm font-semibold text-white">{heading}</h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-white/70 hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold text-white">Stay in the loop</h3>
            <p className="mt-3 text-sm text-white/70">
              Community news, events, and member spotlights — straight to your inbox.
            </p>
            <div className="mt-4">
              <NewsletterForm tone="dark" />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Built for the community of Toluca Lake.</p>
        </div>
      </Container>
    </footer>
  );
}
