"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { auth } from "@/auth";

type Result = { ok: boolean; error?: string; slug?: string };

/** Resolve the signed-in member, returning their user id + linked business slug. */
async function requireMember(): Promise<
  { userId: string; businessSlug: string | null } | { error: string }
> {
  const session = await auth();
  const u = session?.user as { id?: string; businessSlug?: string | null } | undefined;
  if (!u?.id) return { error: "Please sign in to continue." };
  return { userId: u.id, businessSlug: u.businessSlug ?? null };
}

// ---------------- Profile ----------------
export async function updateMemberProfile(input: { name: string }): Promise<Result> {
  const m = await requireMember();
  if ("error" in m) return { ok: false, error: m.error };
  if (!input.name?.trim()) return { ok: false, error: "Your name is required." };
  try {
    await db.user.update({ where: { id: m.userId }, data: { name: input.name.trim() } });
    revalidatePath("/portal");
    revalidatePath("/portal/profile");
    return { ok: true };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Could not save your profile." };
  }
}

// ---------------- My business listing ----------------
export type MyBusinessInput = {
  name: string; categoryKey: string; tagline: string; description: string;
  phone?: string; website?: string; address?: string;
};

export async function updateMyBusiness(input: MyBusinessInput): Promise<Result> {
  const m = await requireMember();
  if ("error" in m) return { ok: false, error: m.error };
  if (!m.businessSlug) return { ok: false, error: "No business is linked to your account yet — contact the Chamber to set one up." };
  if (!input.name?.trim()) return { ok: false, error: "Business name is required." };
  try {
    await db.business.update({
      where: { slug: m.businessSlug },
      data: {
        name: input.name.trim(),
        categoryKey: input.categoryKey,
        tagline: input.tagline ?? "",
        description: input.description ?? "",
        phone: input.phone || null,
        website: input.website || null,
        address: input.address || "Toluca Lake, CA",
      },
    });
    revalidatePath("/directory");
    revalidatePath(`/directory/${m.businessSlug}`);
    revalidatePath("/portal/business");
    revalidatePath("/portal");
    return { ok: true, slug: m.businessSlug };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Could not save your listing." };
  }
}

// ---------------- Event registrations ----------------
export async function cancelMyRegistration(id: string): Promise<Result> {
  const m = await requireMember();
  if ("error" in m) return { ok: false, error: m.error };
  try {
    const reg = await db.eventRegistration.findUnique({ where: { id } });
    if (!reg || reg.userId !== m.userId) return { ok: false, error: "Registration not found." };
    await db.eventRegistration.delete({ where: { id } });
    // Keep the event's running count in sync (never below zero).
    const ev = await db.event.findUnique({ where: { slug: reg.eventSlug } });
    if (ev && ev.registered > 0) {
      await db.event.update({ where: { slug: reg.eventSlug }, data: { registered: { decrement: 1 } } });
    }
    revalidatePath("/portal/events");
    revalidatePath("/portal");
    revalidatePath(`/events/${reg.eventSlug}`);
    return { ok: true };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Could not cancel the registration." };
  }
}
