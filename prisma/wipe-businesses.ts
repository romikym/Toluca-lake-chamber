import { PrismaClient } from "@prisma/client";

// One-off: clear the seeded sample businesses from the directory so the
// Chamber starts with an empty directory and adds real members via admin.
// Safe to re-run. Unlinks businesses from users/memberships first (FK order).
const db = new PrismaClient();

async function main() {
  const u = await db.user.updateMany({ where: { businessSlug: { not: null } }, data: { businessSlug: null } });
  const m = await db.membership.updateMany({ where: { businessSlug: { not: null } }, data: { businessSlug: null } });
  const b = await db.business.deleteMany({});
  console.log(`Cleared business links on ${u.count} user(s) and ${m.count} membership(s).`);
  console.log(`Deleted ${b.count} business listing(s). Directory is now empty.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await db.$disconnect(); });
