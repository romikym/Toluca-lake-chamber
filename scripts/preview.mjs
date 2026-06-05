/**
 * Zero-setup local preview — runs the full site (including the database-backed
 * Home, Directory, and Events pages) on a local SQLite file. No Supabase / Postgres,
 * no .env required. Cross-platform (macOS / Linux / Windows).
 *
 *   npm run preview   →   http://localhost:3000
 *
 * It derives a SQLite copy of prisma/schema.prisma (so the models stay in sync),
 * pushes it to ./prisma/preview.db, seeds the demo content, and starts `next dev`.
 *
 * Note: this regenerates the Prisma client for SQLite. To switch back to your real
 * Postgres setup afterwards, run:  npx prisma generate
 */
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const mainSchema = join(root, "prisma", "schema.prisma");
const previewSchema = join(root, "prisma", "schema.preview.prisma");

// Derive a SQLite schema from the Postgres one so the two never drift.
let schema = readFileSync(mainSchema, "utf8");
schema = schema.replace(
  /datasource db \{[\s\S]*?\}/,
  'datasource db {\n  provider = "sqlite"\n  url      = env("DATABASE_URL")\n}'
);
// Drop Postgres-only engine targets — native is all that's needed locally.
schema = schema.replace(/\n\s*binaryTargets\s*=\s*\[[^\]]*\]/, "");
writeFileSync(previewSchema, schema);

const env = {
  ...process.env,
  // Resolved relative to the schema's directory (prisma/), i.e. prisma/preview.db
  DATABASE_URL: "file:./preview.db",
  AUTH_SECRET: process.env.AUTH_SECRET || "preview-only-secret-change-for-production-0123456789",
  AUTH_TRUST_HOST: "true",
};

const run = (cmd) => execSync(cmd, { cwd: root, stdio: "inherit", env });

try {
  console.log("\n▸ Building local SQLite preview database…");
  run(`npx prisma db push --schema "${previewSchema}" --skip-generate --accept-data-loss`);
  run(`npx prisma generate --schema "${previewSchema}"`);
  console.log("\n▸ Seeding demo content (members, events, board, plans…)");
  run("npx tsx prisma/seed.ts");
  console.log("\n▸ Starting the site → http://localhost:3000");
  console.log("  (Stop with Ctrl+C. To return to Postgres later: npx prisma generate)\n");
  run("npx next dev");
} catch (err) {
  if (err && err.signal === "SIGINT") process.exit(0); // Ctrl+C is a normal exit
  console.error("\nPreview failed:", err?.message ?? err);
  process.exit(1);
}
