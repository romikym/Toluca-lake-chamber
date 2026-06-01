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
    <nav className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <div className="glass mx-3 mb-3 flex items-center justify-around rounded-2xl border border-line/70 px-1 py-1.5 shadow-lg">
        {tabs.map((t) => {
          const active = t.href === "/" ? pathname === "/" : pathname.startsWith(t.href);
          const Icon = t.icon;
          return (
            <Link
              key={t.href}
              href={t.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[10px] font-medium transition-colors",
                active ? "text-brand-700" : "text-muted"
              )}
            >
              <span className={cn("flex h-8 w-8 items-center justify-center rounded-full transition-colors", active && "bg-brand-100")}>
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
