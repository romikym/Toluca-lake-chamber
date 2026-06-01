"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Check, Heart, Inbox, Mail, Sparkles, BadgeCheck } from "lucide-react";
import { markAllNotificationsRead } from "@/app/actions/notifications";
import type { NotificationDTO } from "@/server/notifications";
import { cn } from "@/lib/utils";

const iconFor: Record<string, typeof Bell> = {
  contact: Mail, application: Inbox, donation: Heart, ai: Sparkles, membership: BadgeCheck,
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function NotificationBell({ notifications, unread }: { notifications: NotificationDTO[]; unread: number }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function markAll() {
    await markAllNotificationsRead();
    router.refresh();
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-10 w-10 items-center justify-center rounded-xl text-ink-soft hover:bg-brand-50"
        aria-label={`Notifications${unread ? ` (${unread} unread)` : ""}`}
      >
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <motion.span
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-semibold text-white"
          >
            {unread > 9 ? "9+" : unread}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.16, ease: [0.2, 0.8, 0.2, 1] }}
              className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-2xl border border-line bg-surface shadow-lg"
            >
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <span className="font-display font-semibold text-brand-900">Notifications</span>
                {unread > 0 && (
                  <button onClick={markAll} className="flex items-center gap-1 text-xs text-brand-600 hover:underline">
                    <Check className="h-3 w-3" /> Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="px-4 py-10 text-center text-sm text-muted">You&apos;re all caught up 🎉</p>
                ) : (
                  notifications.map((n) => {
                    const Icon = iconFor[n.type] ?? Bell;
                    const inner = (
                      <div className={cn("flex gap-3 px-4 py-3 transition-colors hover:bg-brand-50/60", !n.read && "bg-brand-50/40")}>
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-brand-900">{n.title}</p>
                          {n.body && <p className="truncate text-xs text-muted">{n.body}</p>}
                          <p className="mt-0.5 text-[11px] text-faint">{timeAgo(n.createdAt)}</p>
                        </div>
                        {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-500" />}
                      </div>
                    );
                    return n.link ? (
                      <Link key={n.id} href={n.link} onClick={() => setOpen(false)} className="block border-b border-line/60 last:border-0">{inner}</Link>
                    ) : (
                      <div key={n.id} className="border-b border-line/60 last:border-0">{inner}</div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
