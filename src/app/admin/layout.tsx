import { DashboardShell, type NavLink } from "@/components/dashboard/dashboard-shell";
import { auth } from "@/auth";
import { getNotificationsFor, unreadCountFor } from "@/server/notifications";

const nav: NavLink[] = [
  { href: "/admin", label: "Overview", icon: "LayoutDashboard" },
  { href: "/admin/members", label: "Members", icon: "Users" },
  { href: "/admin/events", label: "Events", icon: "CalendarDays" },
  { href: "/admin/content", label: "Content", icon: "FileText" },
  { href: "/admin/ai", label: "AI Studio", icon: "Sparkles" },
  { href: "/admin/reports", label: "Reports", icon: "BarChart3" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const name = session?.user?.name ?? "Administrator";
  const userId = (session?.user as { id?: string } | undefined)?.id;
  const [notifications, unread] = userId
    ? await Promise.all([getNotificationsFor(userId), unreadCountFor(userId)])
    : [[], 0];

  return (
    <DashboardShell
      nav={nav}
      badge="Admin"
      user={{ name, sub: "Administrator", hue: 145 }}
      notifications={notifications}
      unread={unread}
    >
      {children}
    </DashboardShell>
  );
}
