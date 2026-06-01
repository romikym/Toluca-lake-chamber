# Deploying to Netlify (via GitHub)

This app is a full Next.js 15 server app (SSR, server actions, API routes, Prisma).
Netlify runs it serverlessly via the official Next.js plugin. The only thing it can't
provide is a database disk — so you need a **hosted PostgreSQL** database (free).

Total time: ~15 minutes.

---

## Step 1 — Get your Supabase Postgres connection strings

In your Supabase project: click **Connect** (top bar) → **ORMs** → **Prisma**. It shows
two values, ready to copy:

- **`DATABASE_URL`** — the pooled connection (Supavisor, transaction mode, port **6543**,
  ends with `?pgbouncer=true`). Used at runtime / serverless.
- **`DIRECT_URL`** — the direct connection (port **5432**). Used by `prisma db push` and
  migrations.

(If it asks for the database password, it's the one you set when creating the project —
reset it under **Settings → Database** if needed.)

> Both are needed because Supabase's pooled connection is great for serverless but can't
> run schema migrations — the schema's `directUrl` handles that automatically.

## Step 2 — Load the schema + seed data into that database

On your computer, in this project folder:

```bash
# Put BOTH Supabase URLs from Step 1 in a .env file:
#   DATABASE_URL="postgresql://postgres.REF:PW@...pooler.supabase.com:6543/postgres?pgbouncer=true"
#   DIRECT_URL="postgresql://postgres.REF:PW@...pooler.supabase.com:5432/postgres"

npm install
npm run db:push      # creates all tables (uses DIRECT_URL)
npm run db:seed      # loads the chamber content + demo accounts
```

> Local dev now uses this same Postgres DB (`npm run dev`). To go back to offline
> SQLite, set `provider = "sqlite"` in `prisma/schema.prisma` and
> `DATABASE_URL="file:./dev.db"`.

## Step 3 — Generate an auth secret

```bash
npx auth secret
```
Copy the value it prints (you'll paste it into Netlify).

## Step 4 — Push to GitHub

This folder isn't a git repo yet — initialize and push it:

```bash
git init
git add -A
git commit -m "Toluca Lake Chamber platform"
git branch -M main
```

Create an **empty** repo on GitHub (no README/license), then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/toluca-lake-chamber.git
git push -u origin main
```

> `.env`, `node_modules`, and the local SQLite file are gitignored — your secrets are
> not committed.

## Step 5 — Connect Netlify to the repo

1. Go to https://app.netlify.com → **Add new site → Import an existing project**.
2. Choose **GitHub**, authorize, and pick your repo.
3. Netlify auto-detects Next.js. Leave the build command as `npm run build`
   (it's also set in `netlify.toml`). Click **Deploy** — but first add env vars (next step),
   or add them and redeploy.

## Step 6 — Set environment variables in Netlify

Site → **Site configuration → Environment variables** → add:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Supabase **pooled** URL (port 6543, `?pgbouncer=true`) |
| `DIRECT_URL` | Supabase **direct** URL (port 5432) |
| `AUTH_SECRET` | the value from Step 3 |
| `AUTH_TRUST_HOST` | `true` |
| `AUTH_URL` | your Netlify URL, e.g. `https://YOUR-SITE.netlify.app` |

Optional (enable real services — all have graceful fallbacks if omitted):

| Key | Purpose |
|-----|---------|
| `ANTHROPIC_API_KEY` | real Claude AI answers |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | real payments |
| `RESEND_API_KEY`, `EMAIL_FROM` | real emails |

Then **Deploys → Trigger deploy → Clear cache and deploy site**.

## Step 7 — After it's live

- Update the hardcoded production URL in `src/app/layout.tsx` (`metadataBase`),
  `src/app/sitemap.ts`, and `src/app/robots.ts` to your real domain (then push — Netlify
  redeploys automatically on every push to `main`).
- Set the Stripe webhook endpoint to `https://YOUR-SITE/api/webhooks/stripe` (see
  `docs/CONNECTIONS.md`).
- **Change the demo passwords** (`admin123` / `member123`) or remove the demo users from
  `prisma/seed.ts` before sharing publicly.

## Custom domain

Netlify → **Domain management → Add a domain** (e.g. `tolucalakechamber.com`) and follow
the DNS instructions.

---

### Troubleshooting
- **Pages error with a database message** → `DATABASE_URL` isn't set in Netlify, or you
  skipped Step 2 (push + seed). Re-check env vars and redeploy with cleared cache.
- **Prisma engine error in functions** → already handled via `binaryTargets` in
  `prisma/schema.prisma` and `serverExternalPackages` in `next.config.mjs`.
- **Build can't reach the DB** → `generateStaticParams` falls back to on-demand rendering,
  so the build still succeeds; pages render on first request.
