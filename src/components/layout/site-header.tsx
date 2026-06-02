"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, Search, Instagram, Facebook, User } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { mainNav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  // The home page renders its own bespoke topline + glass nav (see app/page.tsx).
  if (pathname === "/" || pathname.startsWith("/portal") || pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="hidden bg-brand-800 text-white/90 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 text-xs lg:px-8">
          <p className="tracking-wide">Serving the Village of Toluca Lake since 1939</p>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/tolucalakechamber/" target="_blank" rel="noopener noreferrer" className="hover:text-white" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://www.facebook.com/TolucaLakeChamberOfCommerce" target="_blank" rel="noopener noreferrer" className="hover:text-white" aria-label="Facebook">
              <Facebook className="h-4 w-4" />
            </a>
            <Link href="/login" className="flex items-center gap-1.5 hover:text-white">
              <User className="h-3.5 w-3.5" /> Member Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar — floating glass pill */}
      <div className="px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={cn(
            "glass luxe-edge mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl border border-white/50 px-4 py-2.5 transition-all duration-300 sm:px-5",
            scrolled ? "shadow-glass" : "shadow-md"
          )}
        >
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.children ? item.label : null)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      active ? "text-brand-700" : "text-ink-soft hover:text-brand-700"
                    )}
                  >
                    {item.label}
                    {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
                  </Link>
                  <AnimatePresence>
                    {item.children && openMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.16, ease: [0.2, 0.8, 0.2, 1] }}
                        className="absolute left-0 top-full w-72 pt-2"
                      >
                        <div className="glass overflow-hidden rounded-2xl p-2 shadow-lg">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-brand-50"
                            >
                              <div className="text-sm font-medium text-brand-800">{child.label}</div>
                              {child.description && (
                                <div className="text-xs text-muted">{child.description}</div>
                              )}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/directory"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/70 text-ink-soft transition hover:border-brand-300 hover:text-brand-700 sm:flex"
              aria-label="Search the directory"
            >
              <Search className="h-[18px] w-[18px]" />
            </Link>
            <ButtonLink href="/donate" variant="secondary" size="sm" className="hidden sm:inline-flex">
              Donate
            </ButtonLink>
            <ButtonLink href="/membership/apply" size="sm" className="glow-emerald hidden sm:inline-flex">
              Join the Chamber
            </ButtonLink>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-brand-800 hover:bg-brand-50 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[57px] z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-brand-900/20 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.nav
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative mx-3 mt-3 max-h-[80dvh] overflow-y-auto rounded-2xl border border-line bg-surface p-3 shadow-lg"
            >
              {mainNav.map((item) => (
                <div key={item.label} className="border-b border-line/70 py-1 last:border-0">
                  <Link href={item.href} className="block rounded-xl px-3 py-2.5 font-medium text-brand-800 hover:bg-brand-50">
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-2 mb-1">
                      {item.children.slice(1).map((c) => (
                        <Link key={c.href} href={c.href} className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-brand-50 hover:text-brand-700">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <ButtonLink href="/donate" variant="secondary" size="sm">Donate</ButtonLink>
                <ButtonLink href="/membership/apply" size="sm">Join</ButtonLink>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
