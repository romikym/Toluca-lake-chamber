import { DashboardShell, type NavLink } from "@/components/dashboard/dashboard-shell";
import { auth } from "@/auth";
import { getNotificationsFor, unreadCountFor } from "@/server/notifications";

const nav: NavLink[] = [
  { href: "/portal", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/portal/business", label: "My Listing", icon: "Store" },
  { href: "/portal/events", label: "My Events", icon: "CalendarDays" },
  { href: "/portal/billing", label: "Billing", icon: "Receipt" },
  { href: "/portal/ai", label: "AI Tools", icon: "Sparkles" },
  { href: "/portal/profile", label: "Profile", icon: "UserCog" },
];

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const name = session?.user?.name ?? "Member";
  const userId = (session?.user as { id?: string } | undefined)?.id;
  const [notifications, unread] = userId
    ? await Promise.all([getNotificationsFor(userId), unreadCountFor(userId)])
    : [[], 0];

  return (
    <DashboardShell
      nav={nav}
      badge="Member Portal"
      user={{ name, sub: session?.user?.email ?? "", hue: 152 }}
      notifications={notifications}
      unread={unread}
    >
      {children}
    </DashboardShell>
  );
}
