"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { slugify } from "@/lib/utils";
import { plans } from "@/lib/data";
import { notifyUserByEmail } from "@/server/notifications";
import { sendEmail, templates } from "@/lib/email";

type Result = { ok: boolean; error?: string; slug?: string };

async function requireAdmin(): Promise<string | null> {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (role !== "ADMIN" && role !== "STAFF") return "You don't have permission to do that.";
  return null;
}

async function uniqueSlug(base: string, exists: (s: string) => Promise<boolean>) {
  let slug = slugify(base) || "item";
  if (await exists(slug)) slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
  return slug;
}

function revalidatePublic(paths: string[]) {
  for (const p of paths) revalidatePath(p);
}

// ---------------- Events ----------------
export type EventInput = {
  slug?: string; title: string; programSlug?: string; start: string; end?: string;
  location: string; address: string; summary: string; description: string;
  membersOnly?: boolean; priceCents?: number; capacity?: number; hue?: number;
};

export async function saveEvent(input: EventInput): Promise<Result> {
  const err = await requireAdmin();
  if (err) return { ok: false, error: err };
  if (!input.title?.trim()) return { ok: false, error: "Title is required." };
  if (!input.start) return { ok: false, error: "Start date/time is required." };

  const data = {
    title: input.title.trim(),
    programSlug: input.programSlug || null,
    start: new Date(input.start),
    end: input.end ? new Date(input.end) : null,
    location: input.location || "Toluca Lake",
    address: input.address || "Toluca Lake, CA",
    summary: input.summary || "",
    description: input.description || "",
    membersOnly: Boolean(input.membersOnly),
    priceCents: Number(input.priceCents) || 0,
    capacity: Number(input.capacity) || 100,
    hue: Number(input.hue) || 150,
  };

  try {
    if (input.slug) {
      await db.event.update({ where: { slug: input.slug }, data });
      revalidatePublic(["/events", `/events/${input.slug}`, "/admin/events", "/", "/admin"]);
      return { ok: true, slug: input.slug };
    }
    const slug = await uniqueSlug(input.title, async (s) => !!(await db.event.findUnique({ where: { slug: s } })));
    await db.event.create({ data: { ...data, slug } });
    revalidatePublic(["/events", "/admin/events", "/", "/admin"]);
    return { ok: true, slug };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Could not save the event." };
  }
}

export async function deleteEvent(slug: string): Promise<Result> {
  const err = await requireAdmin();
  if (err) return { ok: false, error: err };
  try {
    await db.eventRegistration.deleteMany({ where: { eventSlug: slug } });
    await db.event.delete({ where: { slug } });
    revalidatePublic(["/events", "/admin/events", "/", "/admin"]);
    return { ok: true };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Could not delete the event." };
  }
}

// ---------------- Businesses / members ----------------
export type BusinessInput = {
  slug?: string; name: string; categoryKey: string; tagline: string; description: string;
  tier?: string; status?: string; phone?: string; website?: string; address?: string; hue?: number;
};

export async function saveBusiness(input: BusinessInput): Promise<Result> {
  const err = await requireAdmin();
  if (err) return { ok: false, error: err };
  if (!input.name?.trim()) return { ok: false, error: "Name is required." };

  const data = {
    name: input.name.trim(),
    categoryKey: input.categoryKey,
    tagline: input.tagline || "",
    description: input.description || "",
    tier: input.tier || "STANDARD",
    status: input.status || "PUBLISHED",
    phone: input.phone || null,
    website: input.website || null,
    address: input.address || "Toluca Lake, CA",
    hue: Number(input.hue) || 150,
  };

  try {
    if (input.slug) {
      await db.business.update({ where: { slug: input.slug }, data });
      revalidatePublic(["/directory", `/directory/${input.slug}`, "/admin/members", "/", "/admin"]);
      return { ok: true, slug: input.slug };
    }
    const slug = await uniqueSlug(input.name, async (s) => !!(await db.business.findUnique({ where: { slug: s } })));
    await db.business.create({ data: { ...data, slug } });
    revalidatePublic(["/directory", "/admin/members", "/", "/admin"]);
    return { ok: true, slug };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Could not save the business." };
  }
}

export async function deleteBusiness(slug: string): Promise<Result> {
  const err = await requireAdmin();
  if (err) return { ok: false, error: err };
  try {
    await db.business.delete({ where: { slug } });
    revalidatePublic(["/directory", "/admin/members", "/", "/admin"]);
    return { ok: true };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Could not delete the business (it may have linked members)." };
  }
}

// ---------------- Articles / content ----------------
export type ArticleInput = {
  slug?: string; title: string; excerpt: string; date: string; type?: string; status?: string; hue?: number;
};

export async function saveArticle(input: ArticleInput): Promise<Result> {
  const err = await requireAdmin();
  if (err) return { ok: false, error: err };
  if (!input.title?.trim()) return { ok: false, error: "Title is required." };

  const data = {
    title: input.title.trim(),
    excerpt: input.excerpt || "",
    date: input.date ? new Date(input.date) : new Date(),
    type: input.type || "SPOTLIGHT",
    status: input.status || "PUBLISHED",
    hue: Number(input.hue) || 150,
  };

  try {
    if (input.slug) {
      await db.article.update({ where: { slug: input.slug }, data });
    } else {
      const slug = await uniqueSlug(input.title, async (s) => !!(await db.article.findUnique({ where: { slug: s } })));
      await db.article.create({ data: { ...data, slug } });
    }
    revalidatePublic(["/about/spotlight", "/admin/content"]);
    return { ok: true };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Could not save the post." };
  }
}

export async function deleteArticle(slug: string): Promise<Result> {
  const err = await requireAdmin();
  if (err) return { ok: false, error: err };
  try {
    await db.article.delete({ where: { slug } });
    revalidatePublic(["/about/spotlight", "/admin/content"]);
    return { ok: true };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Could not delete the post." };
  }
}

// ---------------- Membership applications ----------------
export async function approveApplication(id: string): Promise<Result> {
  const err = await requireAdmin();
  if (err) return { ok: false, error: err };
  try {
    const sub = await db.contactSubmission.findUnique({ where: { id } });
    if (!sub) return { ok: false, error: "Application not found." };

    const planKey = (sub.interest ?? "").replace("Membership application: ", "").trim();
    const plan = plans.find((p) => p.key === planKey);
    const email = sub.email.toLowerCase();

    const user = await db.user.upsert({
      where: { email },
      update: { name: sub.firstName ?? undefined },
      create: { email, name: sub.firstName ?? null, role: "MEMBER" },
    });

    await db.membership.create({
      data: {
        userId: user.id, planKey: plan?.key ?? "resident", status: "ACTIVE",
        startedAt: new Date(), expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      },
    });

    await db.contactSubmission.update({ where: { id }, data: { handled: true } });

    const label = plan ? `${plan.name}${plan.eligibility ? ` — ${plan.eligibility}` : ""}` : "Membership";
    const t = templates.membershipActive(label);
    await sendEmail({ to: email, subject: t.subject, html: t.html });
    await notifyUserByEmail(email, "membership", "Your membership is approved", "Welcome to the Toluca Lake Chamber!", "/portal");

    revalidatePublic(["/admin/members", "/admin"]);
    return { ok: true };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Could not approve the application." };
  }
}

export async function rejectApplication(id: string): Promise<Result> {
  const err = await requireAdmin();
  if (err) return { ok: false, error: err };
  try {
    await db.contactSubmission.update({ where: { id }, data: { handled: true } });
    revalidatePublic(["/admin/members", "/admin"]);
    return { ok: true };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Could not update the application." };
  }
}
