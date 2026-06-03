"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronLeft, LogOut } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Icon } from "@/components/ui/icon";
import { GradientAvatar } from "@/components/ui/gradient";
import { NotificationBell } from "@/components/dashboard/notification-bell";
import { signOutAction } from "@/app/actions/auth";
import type { NotificationDTO } from "@/server/notifications";
import { cn } from "@/lib/utils";

export type NavLink = { href: string; label: string; icon: string };

export function DashboardShell({
  nav,
  user,
  badge,
  accent = 150,
  notifications = [],
  unread = 0,
  children,
}: {
  nav: NavLink[];
  user: { name: string; sub: string; hue: number };
  badge: string;
  accent?: number;
  notifications?: NotificationDTO[];
  unread?: number;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const SideContent = (
    <div className="flex h-full flex-col">
      <div className="px-5 py-5">
        <Logo />
      </div>
      <div className="px-3">
        <span className="ml-2 text-[11px] font-semibold uppercase tracking-wider text-brand-400">{badge}</span>
      </div>
      <nav className="mt-2 flex-1 space-y-1 px-3">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "btn-gradient text-white shadow-[0_10px_24px_-8px_rgba(42,127,184,0.45)]" : "text-ink-soft hover:bg-brand-50"
              )}
            >
              <Icon name={item.icon} className="h-[18px] w-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-line p-3">
        <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted hover:bg-brand-50">
          <ChevronLeft className="h-[18px] w-[18px]" /> Back to site
        </Link>
        <form action={signOutAction}>
          <button type="submit" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted hover:bg-brand-50">
            <LogOut className="h-[18px] w-[18px]" /> Sign out
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh bg-canvas/50">
      {/* Desktop sidebar */}
      <aside className="glass-strong fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-white/40 lg:block">
        {SideContent}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-brand-900/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="glass-strong absolute inset-y-0 left-0 w-64 shadow-lg">
              {SideContent}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-surface/80 px-4 py-3 backdrop-blur-md sm:px-6">
          <button onClick={() => setOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-xl text-brand-800 hover:bg-brand-50 lg:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <NotificationBell notifications={notifications} unread={unread} />
            <div className="flex items-center gap-2.5">
              <GradientAvatar name={user.name} hue={user.hue} className="h-9 w-9 rounded-full text-xs" rounded="rounded-full" />
              <div className="hidden text-right sm:block">
                <div className="text-sm font-semibold leading-tight text-brand-900">{user.name}</div>
                <div className="text-xs text-muted">{user.sub}</div>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
