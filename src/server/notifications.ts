import { db } from "@/lib/db";

export type NotificationDTO = {
  id: string; type: string; title: string; body: string | null; link: string | null;
  read: boolean; createdAt: string;
};

/** Create a notification for every admin/staff user. */
export async function notifyAdmins(type: string, title: string, body?: string, link?: string) {
  const admins = await db.user.findMany({ where: { role: { in: ["ADMIN", "STAFF"] } }, select: { id: true } });
  if (admins.length === 0) return;
  await db.notification.createMany({
    data: admins.map((a) => ({ userId: a.id, type, title, body: body ?? null, link: link ?? null })),
  });
}

export async function notifyUser(userId: string, type: string, title: string, body?: string, link?: string) {
  await db.notification.create({ data: { userId, type, title, body: body ?? null, link: link ?? null } });
}

export async function notifyUserByEmail(email: string, type: string, title: string, body?: string, link?: string) {
  const user = await db.user.findUnique({ where: { email: email.toLowerCase() }, select: { id: true } });
  if (user) await notifyUser(user.id, type, title, body, link);
}

export async function getNotificationsFor(userId: string, take = 15): Promise<NotificationDTO[]> {
  const rows = await db.notification.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take });
  return rows.map((n) => ({
    id: n.id, type: n.type, title: n.title, body: n.body, link: n.link,
    read: n.readAt !== null, createdAt: n.createdAt.toISOString(),
  }));
}

export async function unreadCountFor(userId: string) {
  return db.notification.count({ where: { userId, readAt: null } });
}
