"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown, ChevronRight, Menu, X, Search, Instagram, Facebook, User, ArrowRight,
  Info, Users, Landmark, Sparkles, HelpCircle, CalendarDays, Leaf, Network,
  Palette, Moon, HeartPulse, Gift, Utensils, Tag, BadgeCheck, UserPlus,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Magnetic } from "@/components/ui/magnetic";
import { mainNav } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Icon for each dropdown destination, keyed by href. */
const NAV_ICONS: Record<string, LucideIcon> = {
  "/about": Info,
  "/about/board": Users,
  "/about/legacy": Landmark,
  "/about/spotlight": Sparkles,
  "/about/faq": HelpCircle,
  "/events": CalendarDays,
  "/events/programs/community-cleanup": Leaf,
  "/events/programs/networking-mixers": Network,
  "/events/programs/art-fair": Palette,
  "/events/programs/community-howl": Moon,
  "/events/programs/health-fair": HeartPulse,
  "/events/programs/holiday-open-house": Gift,
  "/events/programs/pancake-breakfast": Utensils,
  "/membership": Tag,
  "/membership/benefits": BadgeCheck,
  "/membership/apply": UserPlus,
};

const ICON_TINTS = ["icon-emerald", "icon-lake", "icon-sunset", "icon-twilight"];

const dropdownVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.16, ease: [0.16, 1, 0.3, 1] } },
};
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } },
};

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
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
        className={cn("pointer-events-auto hidden border-b border-white/10 text-white/85 transition-opacity duration-300 md:block", scrolled ? "opacity-0" : "opacity-100")}
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
          className={cn("nav-pill mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[28px] px-4 py-2.5 text-white transition-all duration-300 sm:px-5", scrolled && "scale-[0.985] shadow-[0_24px_70px_rgba(0,20,14,0.4)]")}
        >
          <Logo variant="light" />

          <nav className="hidden items-center gap-0.5 lg:flex" onMouseLeave={() => { setHovered(null); setOpenMenu(null); }}>
            {mainNav.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              const showHi = hovered === item.label || (hovered === null && active);
              const wide = (item.children?.length ?? 0) > 5;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => { setHovered(item.label); setOpenMenu(item.children ? item.label : null); }}
                >
                  <Link
                    href={item.href}
                    className={cn("relative flex items-center gap-1 rounded-full px-3.5 py-2 text-[13px] font-semibold tracking-wide transition-colors", showHi || active ? "text-white" : "text-white/80 hover:text-white")}
                  >
                    {showHi && (
                      <motion.span
                        layoutId="nav-highlight"
                        className="absolute inset-0 -z-0 rounded-full bg-white/15 ring-1 ring-inset ring-white/15"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                    {item.children && (
                      <ChevronDown className={cn("relative z-10 h-3 w-3 opacity-70 transition-transform duration-300", openMenu === item.label && "rotate-180")} />
                    )}
                  </Link>

                  <AnimatePresence>
                    {item.children && openMenu === item.label && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className={cn("absolute left-1/2 top-full -translate-x-1/2 pt-3.5", wide ? "w-[36rem]" : "w-[20rem]")}
                      >
                        {/* caret */}
                        <div className="absolute left-1/2 top-2.5 h-3 w-3 -translate-x-1/2 rotate-45 rounded-[3px] border-l border-t border-white/60 bg-white/80" />
                        <div className="overflow-hidden rounded-[26px] p-[1px] shadow-luxe" style={{ background: "linear-gradient(140deg, rgba(91,226,161,0.5), rgba(58,166,230,0.32) 50%, rgba(120,102,217,0.36))" }}>
                          <div className="glass-strong rounded-[25px] p-2">
                            <motion.div variants={gridVariants} className={cn("grid gap-1", wide && "grid-cols-2")}>
                              {item.children.map((child, i) => {
                                const ChildIcon = NAV_ICONS[child.href] ?? Sparkles;
                                return (
                                  <motion.div key={child.href} variants={itemVariants}>
                                    <Link href={child.href} className="group/item flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-brand-50">
                                      <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-sm transition-transform duration-300 group-hover/item:scale-110 group-hover/item:-rotate-3", ICON_TINTS[i % ICON_TINTS.length])}>
                                        <ChildIcon className="h-[18px] w-[18px]" strokeWidth={2} />
                                      </span>
                                      <span className="min-w-0 flex-1">
                                        <span className="block truncate text-[13.5px] font-semibold text-brand-900">{child.label}</span>
                                        {child.description && <span className="block truncate text-[11.5px] text-muted">{child.description}</span>}
                                      </span>
                                      <ChevronRight className="h-4 w-4 shrink-0 text-faint opacity-0 transition-all duration-300 group-hover/item:translate-x-0.5 group-hover/item:text-brand-500 group-hover/item:opacity-100" />
                                    </Link>
                                  </motion.div>
                                );
                              })}
                            </motion.div>
                            <motion.div variants={itemVariants} className="mt-1 px-1 pb-0.5">
                              <Link href={item.href} className="link-arrow flex items-center justify-between rounded-2xl bg-gradient-to-r from-brand-50 to-transparent px-3 py-2.5 text-[12.5px] font-semibold text-brand-700">
                                Explore all {item.label.toLowerCase()}
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                            </motion.div>
                          </div>
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
            <Magnetic className="hidden sm:inline-flex" strength={10}>
              <Link href="/membership/apply" className="btn-gradient inline-flex h-10 items-center rounded-full px-5 text-[13px] font-semibold text-white transition hover:-translate-y-0.5">
                Join the Chamber
              </Link>
            </Magnetic>
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
                    <div className="mb-1 ml-1">
                      {item.children.slice(1).map((c, i) => {
                        const ChildIcon = NAV_ICONS[c.href] ?? Sparkles;
                        return (
                          <Link key={c.href} href={c.href} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-ink-soft transition hover:bg-brand-50 hover:text-brand-800">
                            <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white", ICON_TINTS[i % ICON_TINTS.length])}>
                              <ChildIcon className="h-3.5 w-3.5" strokeWidth={2} />
                            </span>
                            {c.label}
                          </Link>
                        );
                      })}
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
