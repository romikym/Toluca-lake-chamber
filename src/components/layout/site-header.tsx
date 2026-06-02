"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, Search, Instagram, Facebook, User } from "lucide-react";
import { Logo } from "@/components/brand/logo";
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

  if (pathname.startsWith("/portal") || pathname.startsWith("/admin")) return null;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div
        className={cn("pointer-events-auto hidden border-b border-white/10 text-white/85 transition-opacity duration-500 md:block", scrolled ? "opacity-0" : "opacity-100")}
        style={{ background: "rgba(0, 29, 22, 0.55)", backdropFilter: "blur(20px) saturate(160%)" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 text-[11px] tracking-wide lg:px-8">
          <p>Serving the Village of Toluca Lake since 1939</p>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/tolucalakechamber/" target="_blank" rel="noopener noreferrer" className="transition hover:text-white" aria-label="Instagram">
              <Instagram className="h-3.5 w-3.5" />
            </a>
            <a href="https://www.facebook.com/TolucaLakeChamberOfCommerce" target="_blank" rel="noopener noreferrer" className="transition hover:text-white" aria-label="Facebook">
              <Facebook className="h-3.5 w-3.5" />
            </a>
            <Link href="/login" className="flex items-center gap-1.5 transition hover:text-white">
              <User className="h-3 w-3" /> Member Login
            </Link>
          </div>
        </div>
      </div>

      <div className="pointer-events-auto px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={cn("nav-pill mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[28px] px-4 py-2.5 text-white transition-all duration-500 sm:px-5", scrolled && "scale-[0.985] shadow-[0_24px_70px_rgba(0,20,14,0.4)]")}
        >
          <Logo variant="light" />

          <nav className="hidden items-center gap-0.5 lg:flex">
            {mainNav.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <div key={item.label} className="relative" onMouseEnter={() => setOpenMenu(item.children ? item.label : null)} onMouseLeave={() => setOpenMenu(null)}>
                  <Link
                    href={item.href}
                    className={cn("flex items-center gap-1 rounded-full px-3.5 py-2 text-[13px] font-semibold tracking-wide transition-all", active ? "bg-white/15 text-white" : "text-white/85 hover:bg-white/10 hover:text-white")}
                  >
                    {item.label}
                    {item.children && <ChevronDown className="h-3 w-3 opacity-60" />}
                  </Link>
                  <AnimatePresence>
                    {item.children && openMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-0 top-full w-80 pt-3"
                      >
                        <div className="glass-strong overflow-hidden rounded-3xl p-2 shadow-luxe">
                          {item.children.map((child) => (
                            <Link key={child.href} href={child.href} className="block rounded-2xl px-4 py-3 transition-colors hover:bg-brand-50">
                              <div className="text-sm font-semibold text-brand-900">{child.label}</div>
                              {child.description && <div className="mt-0.5 text-xs text-muted">{child.description}</div>}
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

          <div className="flex items-center gap-2">
            <Link href="/directory" className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/8 text-white transition hover:bg-white/16 sm:flex" aria-label="Search the directory">
              <Search className="h-[18px] w-[18px]" />
            </Link>
            <Link href="/donate" className="hidden h-10 items-center rounded-full border border-white/30 bg-white/5 px-5 text-[13px] font-semibold text-white transition hover:bg-white/15 sm:inline-flex">
              Donate
            </Link>
            <Link href="/membership/apply" className="btn-gradient hidden h-10 items-center rounded-full px-5 text-[13px] font-semibold text-white transition hover:-translate-y-0.5 sm:inline-flex">
              Join the Chamber
            </Link>
            <button onClick={() => setOpen((v) => !v)} className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/10 lg:hidden" aria-label="Toggle menu" aria-expanded={open}>
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-auto fixed inset-0 top-[68px] lg:hidden">
            <div className="absolute inset-0 bg-brand-950/40 backdrop-blur-md" onClick={() => setOpen(false)} />
            <motion.nav
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-3 mt-3 max-h-[80dvh] overflow-y-auto rounded-3xl glass-strong p-3 shadow-luxe"
            >
              {mainNav.map((item) => (
                <div key={item.label} className="border-b border-line/60 py-1 last:border-0">
                  <Link href={item.href} className="block rounded-2xl px-4 py-3 font-semibold text-brand-900 transition hover:bg-brand-50">
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-2 mb-1">
                      {item.children.slice(1).map((c) => (
                        <Link key={c.href} href={c.href} className="block rounded-xl px-4 py-2 text-sm text-muted transition hover:bg-brand-50 hover:text-brand-700">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2 px-1 pb-1">
                <Link href="/donate" className="flex h-11 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-800 transition hover:bg-brand-100">
                  Donate
                </Link>
                <Link href="/membership/apply" className="btn-gradient flex h-11 items-center justify-center rounded-full text-sm font-semibold text-white">
                  Join the Chamber
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
