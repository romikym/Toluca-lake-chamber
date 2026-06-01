# 01 — System Overview

## Technology stack

| Layer | Choice | Why |
|-------|--------|-----|
| **Framework** | **Next.js 15 (App Router) + React 19 + TypeScript** | One codebase for UI + API; RSC for SEO; mature ecosystem; easy Vercel deploy |
| **Styling** | **Tailwind CSS v4** + CSS variables (design tokens) | Token-driven theming (green-only), fast, consistent; tokens shared with mobile |
| **UI primitives** | **Radix UI** + custom component library (shadcn-style) | Accessible, unstyled primitives we skin to the premium design system |
| **Animation** | **Framer Motion** + CSS; `prefers-reduced-motion` honored | Premium, controlled micro-interactions (Phase 3 framework) |
| **API** | **tRPC** (internal) + thin **REST** surface (`/api/v1/*`) for mobile/webhooks | End-to-end type safety for web; REST for native app + third parties |
| **Validation** | **Zod** (shared schemas) | One schema validates forms, API input, and tRPC procedures |
| **ORM / DB** | **Prisma** + **PostgreSQL** | Type-safe schema, migrations, relations; portable (no lock-in) |
| **Auth** | **Auth.js (NextAuth v5)** — credentials + email magic link + OAuth | Sessions, multi-provider, works with our RBAC; native app uses JWT issuance |
| **Payments** | **Stripe** (Billing + Checkout + Invoicing) | Subscriptions (membership), one-off (events/donations), invoices, receipts |
| **AI** | **Anthropic Claude API** (`@anthropic-ai/sdk`) | Assistants + content tools; server-only, governed |
| **Email/ESP** | **Resend** (transactional) + broadcast list (newsletter) | Reliable delivery, React Email templates |
| **File storage** | **Vercel Blob** (or S3-compatible) | Member logos, event photos, media library |
| **Maps** | **Mapbox GL** (or MapLibre) | Directory & event map views |
| **Background jobs** | **Vercel Cron** + queue (Upstash QStash / Inngest) | Renewals, reminders, digest emails, AI batch, analytics rollups |
| **Caching** | Next.js cache + **Upstash Redis** | Rate limiting, sessions cache, hot reads |
| **Search** | Postgres full-text (launch) → Typesense/Meilisearch (scale) | Directory search; start simple, swap when needed |
| **Analytics** | Vercel Analytics + PostHog (product) | Web + product analytics, funnels, feature flags |
| **Hosting** | **Vercel** (app) + managed Postgres (Neon/Supabase/RDS) | Serverless scale, previews, CDN, edge |
| **Mobile (future)** | **Expo / React Native** in same monorepo | Reuses API + tokens; see doc 11 |

> All third-party choices are swappable behind our service layer (e.g. Resend → Postmark,
> Vercel Blob → S3) because UI/business logic never call vendors directly.

## Monorepo layout

```
toluca-lake-chamber/
├── apps/
│   ├── web/                      # Next.js app (public site + portal + admin)
│   └── mobile/                   # Expo app (added in mobile phase)
├── packages/
│   ├── db/                       # Prisma schema, client, migrations, seed
│   ├── api/                      # tRPC routers + service layer (business logic)
│   ├── auth/                     # Auth.js config, session, RBAC helpers
│   ├── ai/                       # Claude service, prompt templates, logging
│   ├── payments/                 # Stripe service + webhook handlers
│   ├── notifications/            # Email templates + dispatch
│   ├── validators/               # Shared Zod schemas
│   ├── ui/                       # Design-system components (web)
│   ├── tokens/                   # Design tokens (colors/space/type) — shared w/ mobile
│   └── config/                   # tsconfig, eslint, tailwind preset
└── docs/                         # phase-1, phase-2, ... (this documentation)
```

Tooling: **pnpm workspaces + Turborepo** for builds/caching.

## Application surfaces (one app, three audiences)

| Surface | Route prefix | Audience | Rendering |
|---------|-------------|----------|-----------|
| **Public site** | `/` | Visitors, prospects | Mostly RSC/SSG, SEO-critical |
| **Member portal** | `/portal/*` | Logged-in members | Auth-gated, mostly client/dynamic |
| **Admin dashboard** | `/admin/*` | Staff/board admins | Auth-gated + role-gated |
| **API** | `/api/v1/*`, `/api/trpc/*`, `/api/webhooks/*` | Mobile, integrations, Stripe | JSON |

## Environments

| Env | Branch | DB | Stripe | AI | Purpose |
|-----|--------|----|--------|----|---------|
| Local | feature | local/Neon branch | test | test key (low limit) | Development |
| Preview | PR | ephemeral branch DB | test | test key | Per-PR review (Vercel preview) |
| Staging | `staging` | staging DB | test | prod key (capped) | QA, client review |
| Production | `main` | prod DB | live | prod key | Live site |

## Secrets / environment variables (managed, never in client)

```
DATABASE_URL, DIRECT_URL
AUTH_SECRET, AUTH_URL, AUTH_GOOGLE_ID/SECRET (etc.)
ANTHROPIC_API_KEY, AI_MODEL_DEFAULT, AI_MONTHLY_BUDGET
STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_* (per plan)
RESEND_API_KEY, EMAIL_FROM
BLOB_READ_WRITE_TOKEN  (or S3 creds)
MAPBOX_TOKEN
UPSTASH_REDIS_URL/TOKEN, QSTASH_TOKEN
POSTHOG_KEY
```

- `NEXT_PUBLIC_*` only for genuinely public values (e.g. Mapbox public token, PostHog
  host). **No secret keys are ever exposed to the browser or mobile bundle.**

## Cross-cutting concerns

- **Type safety end-to-end**: Zod + Prisma + tRPC types flow from DB → API → UI.
- **Error handling**: typed errors, central logging (Sentry), user-safe messages.
- **Observability**: structured logs, request tracing, AI/Stripe webhook audit trails.
- **Security**: input validation everywhere, RBAC on every mutation, rate limiting,
  CSRF protection on forms, signed webhooks, least-privilege DB roles.
- **Performance**: RSC + streaming, image optimization, route-level caching, DB
  indexes, pagination, lazy-loaded heavy widgets (map, charts, AI panels).
- **Accessibility**: Radix primitives, semantic HTML, keyboard/focus management,
  reduced-motion support — targeting WCAG 2.2 AA.
