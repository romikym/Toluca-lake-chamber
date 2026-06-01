import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  categories, businesses, plans, programs, events, board, faqs,
  spotlightArticles, sponsors,
} from "../src/lib/data";

const db = new PrismaClient();

async function main() {
  console.log("Seeding database…");

  // Clear (FK-safe order)
  await db.notification.deleteMany();
  await db.eventRegistration.deleteMany();
  await db.membership.deleteMany();
  await db.user.deleteMany();
  await db.event.deleteMany();
  await db.business.deleteMany();
  await db.category.deleteMany();
  await db.membershipPlan.deleteMany();
  await db.program.deleteMany();
  await db.boardMember.deleteMany();
  await db.faq.deleteMany();
  await db.article.deleteMany();
  await db.sponsor.deleteMany();

  await db.category.createMany({
    data: categories.map((c, i) => ({ key: c.key, name: c.name, icon: c.icon, sortOrder: i })),
  });

  await db.membershipPlan.createMany({
    data: plans.map((p, i) => ({
      key: p.key, name: p.name, priceCents: p.priceCents, audience: p.audience,
      eligibility: p.eligibility ?? null, popular: p.popular ?? false,
      benefits: JSON.stringify(p.benefits), sortOrder: i,
    })),
  });

  await db.program.createMany({
    data: programs.map((p) => ({ slug: p.slug, name: p.name, blurb: p.blurb, icon: p.icon })),
  });

  await db.business.createMany({
    data: businesses.map((b) => ({
      slug: b.slug, name: b.name, categoryKey: b.category, tagline: b.tagline,
      description: b.description, tier: b.tier, phone: b.phone ?? null,
      website: b.website ?? null, address: b.address, hue: b.hue,
    })),
  });

  await db.event.createMany({
    data: events.map((e) => ({
      slug: e.slug, title: e.title, programSlug: e.program, start: new Date(e.start),
      end: e.end ? new Date(e.end) : null, location: e.location, address: e.address,
      summary: e.summary, description: e.description, membersOnly: e.membersOnly,
      priceCents: e.price, capacity: e.capacity, registered: e.registered, hue: e.hue,
    })),
  });

  await db.boardMember.createMany({
    data: board.map((m, i) => ({
      name: m.name, role: m.role, company: m.company ?? null, email: m.email ?? null,
      grp: m.group, hue: m.hue, sortOrder: i,
    })),
  });

  await db.faq.createMany({ data: faqs.map((f, i) => ({ question: f.q, answer: f.a, sortOrder: i })) });

  await db.article.createMany({
    data: spotlightArticles.map((a) => ({
      slug: a.slug, title: a.title, excerpt: a.excerpt, date: new Date(a.date), hue: a.hue,
    })),
  });

  await db.sponsor.createMany({ data: sponsors.map((s) => ({ name: s.name, tier: s.tier, hue: s.hue })) });

  // Demo users
  const adminHash = await bcrypt.hash("admin123", 10);
  const memberHash = await bcrypt.hash("member123", 10);

  await db.user.create({
    data: { email: "admin@tolucalakechamber.com", name: "Rosie Blosser", role: "ADMIN", passwordHash: adminHash },
  });

  const member = await db.user.create({
    data: {
      email: "taylor@compass.com", name: "Taylor Montana", role: "MEMBER",
      passwordHash: memberHash, businessSlug: "compass-real-estate",
    },
  });

  await db.membership.create({
    data: {
      userId: member.id, planKey: "business_large", businessSlug: "compass-real-estate",
      status: "ACTIVE", startedAt: new Date("2026-03-14"), expiresAt: new Date("2027-03-14"),
      autoRenew: true,
    },
  });

  console.log(`Seeded: ${categories.length} categories, ${businesses.length} businesses, ${events.length} events, ${board.length} board members, 2 users.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await db.$disconnect(); });
