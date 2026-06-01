import { db } from "@/lib/db";
import type {
  Business, ChamberEvent, Plan, Program, Category, BoardMember, Testimonial,
} from "@/lib/data";

// DB rows are mapped back to the shared frontend types so components are unchanged.

export async function getCategories(): Promise<Category[]> {
  const rows = await db.category.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.map((c) => ({ key: c.key, name: c.name, icon: c.icon }));
}

function toBusiness(b: {
  slug: string; name: string; categoryKey: string; tagline: string; description: string;
  tier: string; phone: string | null; website: string | null; address: string; hue: number;
}): Business {
  return {
    slug: b.slug, name: b.name, category: b.categoryKey, tagline: b.tagline,
    description: b.description, tier: b.tier as Business["tier"],
    phone: b.phone ?? undefined, website: b.website ?? undefined, address: b.address, hue: b.hue,
  };
}

export async function getBusinesses(): Promise<Business[]> {
  const rows = await db.business.findMany({ orderBy: { name: "asc" } });
  return rows.map(toBusiness);
}

export async function getBusiness(slug: string): Promise<Business | null> {
  const b = await db.business.findUnique({ where: { slug } });
  return b ? toBusiness(b) : null;
}

export async function getRelatedBusinesses(categoryKey: string, excludeSlug: string, take = 3) {
  const rows = await db.business.findMany({
    where: { categoryKey, slug: { not: excludeSlug } }, take,
  });
  return rows.map(toBusiness);
}

function toEvent(e: {
  slug: string; title: string; programSlug: string | null; start: Date; end: Date | null;
  location: string; address: string; summary: string; description: string; membersOnly: boolean;
  priceCents: number; capacity: number; registered: number; hue: number;
}): ChamberEvent {
  return {
    slug: e.slug, title: e.title, program: e.programSlug ?? "", start: e.start.toISOString(),
    end: e.end ? e.end.toISOString() : undefined, location: e.location, address: e.address,
    summary: e.summary, description: e.description, membersOnly: e.membersOnly,
    price: e.priceCents, capacity: e.capacity, registered: e.registered, hue: e.hue,
  };
}

export async function getEvents(): Promise<ChamberEvent[]> {
  const rows = await db.event.findMany({ orderBy: { start: "asc" } });
  return rows.map(toEvent);
}

export async function getEvent(slug: string): Promise<ChamberEvent | null> {
  const e = await db.event.findUnique({ where: { slug } });
  return e ? toEvent(e) : null;
}

export async function getEventsForProgram(programSlug: string): Promise<ChamberEvent[]> {
  const rows = await db.event.findMany({ where: { programSlug }, orderBy: { start: "asc" } });
  return rows.map(toEvent);
}

export async function getPrograms(): Promise<Program[]> {
  const rows = await db.program.findMany();
  return rows.map((p) => ({ slug: p.slug, name: p.name, blurb: p.blurb, icon: p.icon }));
}

export async function getProgram(slug: string): Promise<Program | null> {
  const p = await db.program.findUnique({ where: { slug } });
  return p ? { slug: p.slug, name: p.name, blurb: p.blurb, icon: p.icon } : null;
}

export async function getPlans(): Promise<Plan[]> {
  const rows = await db.membershipPlan.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.map((p) => ({
    key: p.key, name: p.name, priceCents: p.priceCents,
    audience: p.audience as Plan["audience"], eligibility: p.eligibility ?? undefined,
    popular: p.popular, benefits: JSON.parse(p.benefits) as string[],
  }));
}

export async function getBoard(): Promise<BoardMember[]> {
  const rows = await db.boardMember.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.map((m) => ({
    name: m.name, role: m.role, company: m.company ?? undefined, email: m.email ?? undefined,
    group: m.grp as BoardMember["group"], hue: m.hue,
  }));
}

export async function getFaqs() {
  const rows = await db.faq.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.map((f) => ({ q: f.question, a: f.answer }));
}

export async function getArticles() {
  const rows = await db.article.findMany({ orderBy: { date: "desc" } });
  return rows.map((a) => ({ slug: a.slug, title: a.title, excerpt: a.excerpt, date: a.date.toISOString(), hue: a.hue }));
}

export async function getSponsors() {
  const rows = await db.sponsor.findMany();
  return rows.map((s) => ({ name: s.name, tier: s.tier, hue: s.hue }));
}

export async function getAdminStats() {
  const [members, events, pendingMembers] = await Promise.all([
    db.business.count(),
    db.event.count(),
    db.membership.count({ where: { status: "PENDING" } }),
  ]);
  return { members, events, pendingMembers };
}
