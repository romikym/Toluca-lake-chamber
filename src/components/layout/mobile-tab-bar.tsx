"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building2, CalendarDays, BadgeCheck, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/directory", label: "Directory", icon: Building2 },
  { href: "/events", label: "Events", icon: CalendarDays },
  { href: "/membership", label: "Join", icon: BadgeCheck },
  { href: "/login", label: "Account", icon: User },
];

export function MobileTabBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/portal") || pathname.startsWith("/admin")) return null;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 pb-[max(env(safe-area-inset-bottom),0px)] lg:hidden">
      <div className="glass-strong mx-3 mb-3 flex items-center justify-around rounded-3xl px-1.5 py-1.5 shadow-luxe">
        {tabs.map((t) => {
          const active = t.href === "/" ? pathname === "/" : pathname.startsWith(t.href);
          const Icon = t.icon;
          return (
            <Link
              key={t.href}
              href={t.href}
              className={cn("flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-1.5 text-[10px] font-semibold transition-colors", active ? "text-brand-800" : "text-muted")}
            >
              <span className={cn("flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200", active ? "btn-gradient text-white shadow-[0_8px_18px_-6px_rgba(0,167,109,0.55)]" : "bg-transparent")}>
                <Icon className="h-5 w-5" />
              </span>
              {t.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
