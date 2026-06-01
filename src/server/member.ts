import { db } from "@/lib/db";

/** Dashboard snapshot for the signed-in member. */
export async function getMemberDashboard(userId: string) {
  const [user, registrations, membership] = await Promise.all([
    db.user.findUnique({ where: { id: userId }, include: { business: true } }),
    db.eventRegistration.findMany({
      where: { userId, status: "CONFIRMED" },
      include: { event: true },
      orderBy: { createdAt: "desc" },
    }),
    db.membership.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { plan: true },
    }),
  ]);

  const now = Date.now();
  const upcoming = registrations
    .filter((r) => r.event.start.getTime() >= now)
    .map((r) => ({
      slug: r.event.slug,
      title: r.event.title,
      start: r.event.start.toISOString(),
      location: r.event.location,
    }));

  return {
    name: user?.name ?? "there",
    businessName: user?.business?.name ?? null,
    businessTier: user?.business?.tier ?? null,
    registeredCount: registrations.length,
    upcoming,
    memberSinceYear: membership?.startedAt ? membership.startedAt.getFullYear() : null,
    membership: membership
      ? {
          planName: membership.plan.name,
          priceCents: membership.plan.priceCents,
          status: membership.status,
          expiresAt: membership.expiresAt ? membership.expiresAt.toISOString() : null,
          autoRenew: membership.autoRenew,
        }
      : null,
  };
}

/** Events the member has registered for, newest first. */
export async function getMyRegistrations(userId: string) {
  const rows = await db.eventRegistration.findMany({
    where: { userId },
    include: { event: true },
    orderBy: { event: { start: "asc" } },
  });
  return rows.map((r) => ({
    id: r.id,
    status: r.status,
    slug: r.event.slug,
    title: r.event.title,
    start: r.event.start.toISOString(),
    location: r.event.location,
    past: r.event.start.getTime() < Date.now(),
  }));
}

/** Membership + payment history for the billing page. */
export async function getMyBilling(userId: string) {
  const user = await db.user.findUnique({ where: { id: userId } });
  const [membership, payments] = await Promise.all([
    db.membership.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { plan: true },
    }),
    user
      ? db.payment.findMany({
          where: { email: user.email },
          orderBy: { createdAt: "desc" },
          take: 20,
        })
      : Promise.resolve([]),
  ]);

  return {
    membership: membership
      ? {
          planName: membership.plan.name,
          priceCents: membership.plan.priceCents,
          audience: membership.plan.audience,
          status: membership.status,
          startedAt: membership.startedAt ? membership.startedAt.toISOString() : null,
          expiresAt: membership.expiresAt ? membership.expiresAt.toISOString() : null,
          autoRenew: membership.autoRenew,
        }
      : null,
    payments: payments.map((p) => ({
      id: p.id,
      kind: p.kind,
      amountCents: p.amountCents,
      status: p.status,
      createdAt: p.createdAt.toISOString(),
    })),
  };
}
