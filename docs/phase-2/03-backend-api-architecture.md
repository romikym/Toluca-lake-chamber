# 03 — Backend & API Architecture

## Layered design

```
Route handler / Server Action / tRPC procedure   ← transport (thin)
        │  (auth + input validation here)
        ▼
Service layer (packages/api/services)            ← business logic (all rules live here)
        │  members, events, directory, billing, ai, notify, content, analytics
        ▼
Data access (packages/db — Prisma)               ← typed queries, transactions
        │
        ▼
PostgreSQL  +  external services (Stripe, Claude, Resend, Blob, Maps)
```

**Rule:** transport layers are thin. All business logic lives in **services** so it is
reused identically by web (tRPC/Server Actions), mobile (REST), background jobs, and
AI tools. No Prisma calls in components or route files.

## API surfaces

### 1. tRPC (`/api/trpc/*`) — primary, web internal
- End-to-end typed; routers mirror services.
- Routers: `auth`, `member`, `business`, `directory`, `event`, `registration`,
  `membership`, `billing`, `sponsor`, `donation`, `announcement`, `content`,
  `newsletter`, `contact`, `ai`, `admin`, `analytics`, `media`, `notification`.
- Procedure types: `publicProcedure`, `protectedProcedure` (auth),
  `memberProcedure`, `adminProcedure` (role-guarded), `rateLimited()` wrapper.

### 2. REST (`/api/v1/*`) — mobile app + integrations
- Stable, versioned JSON contract; same services under the hood.
- JWT bearer auth (issued by auth service) for native clients.
- OpenAPI spec generated from Zod schemas (`zod-to-openapi`) → typed mobile client.
- Example resources: `/v1/directory`, `/v1/directory/{slug}`, `/v1/events`,
  `/v1/events/{slug}/register`, `/v1/me`, `/v1/me/business`, `/v1/me/invoices`,
  `/v1/ai/assist`.

### 3. Webhooks (`/api/webhooks/*`)
- `stripe` (signature-verified), `resend` (delivery/bounce), future inbound.

## Validation & error handling

- **Zod** schemas in `packages/validators`, shared by forms, tRPC, and REST.
- Central error mapper → typed `AppError` (code, httpStatus, userMessage, meta).
- User-safe messages out; full detail to logs/Sentry.
- Every mutation: `assertPermission(user, action, resource)` before work.

## Background jobs & scheduling

| Job | Trigger | Action |
|-----|---------|--------|
| Membership renewal reminders | cron daily | email members 30/7/1 days before expiry |
| Auto-renew billing reconcile | Stripe webhook + cron | sync subscription → membership status |
| Event reminders | cron | notify registrants 24h/1h before |
| Waitlist promotion | on cancel | promote next, notify |
| Newsletter/digest send | cron + admin trigger | batched broadcast via ESP |
| AI batch (spotlights, summaries) | admin trigger | queue → Claude → draft for approval |
| Analytics rollups | cron nightly | precompute admin dashboard metrics |
| Media cleanup / thumbnails | on upload | generate sizes, prune orphans |
| Search reindex | on content change | update FTS / search index |

Runner: **Vercel Cron** for schedules + **QStash/Inngest** for queued/retryable work.
Idempotency keys on all external-effect jobs.

## File storage & media

- **Vercel Blob / S3** for member logos, gallery images, event photos, documents.
- Upload via signed URLs (client → storage direct), metadata recorded in `media` table.
- Image pipeline: validate type/size → store original → generate responsive variants
  (next/image or on-upload transform) → serve via CDN.
- Access control: public assets (logos, event covers) vs. private (invoices/receipts
  served through authorized route).

## Caching & rate limiting

- **Redis (Upstash)**: rate limits (per-IP public forms, per-user AI/API), session
  cache, hot directory reads, idempotency keys.
- Next.js data cache with **tag revalidation** (`revalidateTag('directory')` on member
  edit, `'events'` on event change).
- Public REST GETs cacheable at edge with short TTL + stale-while-revalidate.

## Security

- All secrets via env (doc 01); never in client/mobile bundle.
- RBAC enforced in services (defense in depth beyond UI gating).
- Signed Stripe/Resend webhooks; replay protection.
- CSRF protection on Server Actions/forms; SameSite cookies.
- Input sanitization; parameterized queries (Prisma).
- Audit log for sensitive admin actions (role changes, refunds, deletions).
- PII minimization; payment data handled **only** by Stripe (no card data stored).

## Observability

- Structured logging (request id, user id, route, latency).
- **Sentry** for errors (web + API + jobs).
- Audit trail tables for admin actions, payments, and AI usage.
- Health checks + uptime monitoring on critical webhooks/jobs.
