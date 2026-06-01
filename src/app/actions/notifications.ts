"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function markAllNotificationsRead(): Promise<{ ok: boolean }> {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) return { ok: false };
  await db.notification.updateMany({ where: { userId, readAt: null }, data: { readAt: new Date() } });
  revalidatePath("/portal");
  revalidatePath("/admin");
  return { ok: true };
}

export async function markNotificationRead(id: string): Promise<{ ok: boolean }> {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) return { ok: false };
  await db.notification.updateMany({ where: { id, userId }, data: { readAt: new Date() } });
  return { ok: true };
}
