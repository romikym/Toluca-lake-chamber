# Toluca Lake Chamber of Commerce — Platform

A premium, custom Chamber of Commerce platform — public site, business directory,
events, membership, member portal, admin dashboard, and Claude AI throughout. Built to
feel like a modern SaaS app and to be mobile-app-ready.

Rebuild of the original Wix Studio site, with **all yellow/gold removed** in favor of a
refined green-only design system.

## Quick start

```bash
npm install            # also runs `prisma generate`
npm run db:push        # create the local SQLite database
npm run db:seed        # load Phase 1 data + demo accounts
npm run dev            # http://localhost:3000
```

Build for production:

```bash
npm run build
npm start
```

> Runs out of the box on a local **SQLite** database (`prisma/dev.db`). Authentication,
> the directory, events, membership, and the contact/newsletter/join forms are **wired
> to the real database**. Stripe payments and transactional email are the remaining
> integrations (stubbed in the UI). For real Claude responses, set `ANTHROPIC_API_KEY`
> in `.env.local`.

### Demo accounts

Two seeded accounts: **admin** `admin@tolucalakechamber.com` and **member**
`taylor@compass.com`. Their passwords are **generated at seed time and printed by
`npm run db:seed`** (or set them yourself via `SEED_ADMIN_PASSWORD` /
`SEED_MEMBER_PASSWORD`) — they are never committed to the repo.

Sign in at `/login`. Admins land on `/admin`, members on `/portal`. Both areas are
protected by middleware.

### Database

- **ORM:** Prisma 6 · **Dev DB:** SQLite (`prisma/schema.prisma`).
- Scripts: `npm run db:push` (sync schema), `npm run db:seed` (seed), `npm run db:studio` (browse).
- **Production:** switch the datasource `provider` to `postgresql` and set `DATABASE_URL`
  — the schema is portable (see `docs/phase-2/04-database-architecture.md`).

## Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** with design tokens (Phase 3 system)
- **Framer Motion** animation framework
- **Anthropic Claude API** (`/api/ai`) with keyless fallback
- **Lucide** icons

## What's built

| Area | Routes |
|------|--------|
| **Public site** | Home, About (+ Board, Legacy, Spotlight, FAQ), Directory (+ profiles), Events (+ detail, programs), Membership (+ benefits, apply), Contact, Donate, Sponsors, Privacy, Terms, Login |
| **Member portal** | `/portal` — dashboard, listing editor, events, billing, AI tools, profile |
| **Admin** | `/admin` — overview, members, events, content, AI Studio, reports |
| **AI** | Floating assistant (every public page) + member/admin content generators |
| **SEO** | Per-page metadata, sitemap, robots |

Explore the portal/admin via **Member Login** (the "Sign in" button opens the portal).

## Project structure

```
src/
├── app/                # routes (public, portal, admin, api)
├── components/
│   ├── ai/             # assistant + content generators
│   ├── cards/          # business, event, plan cards
│   ├── dashboard/      # shell + widgets (stats, charts, rings)
│   ├── directory/      # directory explorer
│   ├── events/         # events browser, registration
│   ├── forms/          # contact, join, donate, newsletter
│   ├── layout/         # header, footer, page hero, mobile nav
│   └── ui/             # primitives + design-system components
└── lib/                # site config, seed data, utils
```

## Design system

Implemented from `docs/phase-3/`. Tokens live in `src/app/globals.css` (`@theme`).
Green-only palette, soft glassy surfaces, Apple-quiet motion with full
`prefers-reduced-motion` support.

## Documentation

Full project docs are in [`docs/`](docs/):

- `docs/phase-1/` — research, content/asset/component/feature inventories
- `docs/phase-2/` — architecture (system, frontend, backend, DB schema, auth, members,
  events, AI, payments, notifications, mobile)
- `docs/phase-3/` — design system, components, animation framework, responsive spec

## Backend status

Done:
- **Prisma + database** (SQLite dev, Postgres-ready).
- **Auth.js** — credentials, JWT sessions, role-based route protection (middleware).
- **DB-backed pages** — directory, events, membership, board, FAQ, spotlight, home.
- **Forms that persist** — newsletter, contact, join application.
- **Stripe payments** — Checkout for membership (subscription), event tickets (one-off),
  and donations (one-off/monthly) via inline `price_data`; a signature-verified
  **webhook** (`/api/webhooks/stripe`) that records payments, activates memberships, and
  confirms registrations. Works **keyless** in dev (records `SIMULATED` rows); set
  `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` to go live.
- **Email (Resend)** — branded HTML templates with transactional sends: newsletter
  welcome, contact acknowledgement + admin alert, membership application, membership
  active, donation receipt, and event confirmation. Wired into the form actions and the
  Stripe webhook. Works **keyless** (logs to the server console); set `RESEND_API_KEY`
  (+ `EMAIL_FROM`) to send for real.
- **Admin on live data** — overview, members, events, content, and reports all read from
  the database; the members table and applications queue reflect real rows.
- **AI governance** — every AI call is logged to `AiLog`; the admin AI Studio shows real
  usage and generated content can be **saved as a draft** that enters an **approval
  queue** (approve/reject) before publishing.
- **Notification center** — a `Notification` table with a real **bell + dropdown** in the
  portal/admin (unread badge, mark-all-read). Contact messages, membership applications,
  donations, and AI drafts notify admins; membership activation notifies the member.
- **Rate limiting** — public forms (5/min), the AI route (20/min), and checkout actions
  (10/min) are throttled per IP with friendly messages. In-memory by default; swap in
  Upstash Redis for multi-instance production (see `docs/CONNECTIONS.md`).
- **Public REST API** (`/api/v1/*`) — versioned JSON endpoints (directory, events,
  programs, plans) with CORS, reading from the same database. Powers the mobile app.
- **Mobile app** (`apps/mobile/`) — a native **Expo / React Native** app reusing the
  green design tokens and the REST API: bottom-tab navigation (Home, Directory, Events,
  Membership, Account) plus business and event detail screens. Run with
  `cd apps/mobile && npm install && npx expo start` (see its README).

**The full platform — web + backend + mobile — is built.** Remaining items are go-live
configuration (`docs/CONNECTIONS.md`) and future enhancements (mobile JWT auth, push
notifications, in-app Stripe PaymentSheet).
