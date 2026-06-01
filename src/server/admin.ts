import { db } from "@/lib/db";
import { categoryName } from "@/lib/data";

export async function adminOverview() {
  const [members, events, subscribers, applications, payAgg, donAgg, aiGenerations, recentDonations, recentSubs, tiers] =
    await Promise.all([
      db.business.count(),
      db.event.count(),
      db.newsletterSubscriber.count(),
      db.contactSubmission.count({ where: { interest: { startsWith: "Membership application" } } }),
      db.payment.aggregate({ _sum: { amountCents: true }, where: { status: { in: ["SUCCEEDED", "SIMULATED"] } } }),
      db.donation.aggregate({ _sum: { amountCents: true } }),
      db.aiLog.count(),
      db.donation.findMany({ orderBy: { createdAt: "desc" }, take: 4 }),
      db.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 4 }),
      db.business.groupBy({ by: ["tier"], _count: { _all: true } }),
    ]);

  const revenueCents = (payAgg._sum.amountCents ?? 0) + (donAgg._sum.amountCents ?? 0);
  const tierOrder = ["PREMIUM", "FEATURED", "STANDARD"];
  const maxTier = Math.max(1, ...tiers.map((t) => t._count._all));
  const byTier = tierOrder
    .map((key) => {
      const row = tiers.find((t) => t.tier === key);
      const n = row?._count._all ?? 0;
      return { label: `${key[0]}${key.slice(1).toLowerCase()} members`, n, w: Math.round((n / maxTier) * 100) };
    });

  return {
    members, events, subscribers, applications, revenueCents, aiGenerations,
    donationsTotalCents: donAgg._sum.amountCents ?? 0,
    byTier,
    recentDonations: recentDonations.map((d) => ({ amountCents: d.amountCents, recurring: d.recurring })),
    recentSubmissions: recentSubs.map((s) => ({ name: [s.firstName, s.lastName].filter(Boolean).join(" ") || s.email, interest: s.interest ?? "General" })),
  };
}

export async function pendingApplications() {
  const rows = await db.contactSubmission.findMany({
    where: { interest: { startsWith: "Membership application" } },
    orderBy: { createdAt: "desc" },
    take: 8,
  });
  return rows.map((r) => ({
    id: r.id,
    name: [r.firstName, r.lastName].filter(Boolean).join(" ") || r.email,
    detail: r.interest?.replace("Membership application: ", "Plan: ") ?? "Application",
  }));
}

export async function adminReports() {
  const [members, subscribers, regAgg, donAgg, byCat] = await Promise.all([
    db.business.count(),
    db.newsletterSubscriber.count(),
    db.event.aggregate({ _sum: { registered: true } }),
    db.donation.aggregate({ _sum: { amountCents: true } }),
    db.business.groupBy({ by: ["categoryKey"], _count: { _all: true } }),
  ]);

  const byCategory = byCat
    .map((c) => ({ label: categoryName(c.categoryKey).split(" ")[0], value: c._count._all }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  return {
    members,
    subscribers,
    attendance: regAgg._sum.registered ?? 0,
    donationsCents: donAgg._sum.amountCents ?? 0,
    byCategory,
  };
}

export async function aiStats() {
  const [generations, pendingDrafts] = await Promise.all([
    db.aiLog.count(),
    db.aiDraft.count({ where: { status: "PENDING" } }),
  ]);
  return { generations, pendingDrafts };
}

export async function getAiDrafts() {
  const rows = await db.aiDraft.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
  return rows;
}

export async function adminContent() {
  const [articles, submissions] = await Promise.all([
    db.article.findMany({ orderBy: { date: "desc" } }),
    db.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
  ]);
  return { articles, submissions };
}
