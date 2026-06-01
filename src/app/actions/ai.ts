"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { notifyAdmins } from "@/server/notifications";

export async function saveAiDraft(input: { feature: string; title: string; content: string }): Promise<{ ok: boolean }> {
  const session = await auth();
  const author = session?.user?.email ?? null;
  if (!input.content.trim()) return { ok: false };
  await db.aiDraft.create({
    data: { feature: input.feature, title: input.title, content: input.content, author, status: "PENDING" },
  });
  await notifyAdmins("ai", "AI draft ready for review", input.title, "/admin/ai");
  revalidatePath("/admin/ai");
  return { ok: true };
}

export async function reviewAiDraft(id: string, decision: "APPROVED" | "REJECTED"): Promise<{ ok: boolean }> {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (role !== "ADMIN" && role !== "STAFF") return { ok: false };
  await db.aiDraft.update({
    where: { id },
    data: { status: decision, reviewedBy: session?.user?.email ?? null },
  });
  revalidatePath("/admin/ai");
  return { ok: true };
}
