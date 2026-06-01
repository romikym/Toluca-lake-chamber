# Phase 2 — Platform Architecture

**Project:** Toluca Lake Chamber of Commerce — Custom Platform
**Stack decision:** Next.js full-stack (confirmed by client)
**Date:** 2026-05-30
**Status:** Architecture design (documentation only — no application code)

This folder defines *how the platform is built* before any code is written. It turns
the Phase 1 research into a concrete, buildable system design.

## Documents

| # | File | Covers |
|---|------|--------|
| 1 | [01-system-overview.md](01-system-overview.md) | Stack, high-level architecture, monorepo, environments, infra |
| 2 | [02-frontend-architecture.md](02-frontend-architecture.md) | App Router, rendering, state, routes, design tokens |
| 3 | [03-backend-api-architecture.md](03-backend-api-architecture.md) | Service layers, API (tRPC/REST), validation, jobs, storage |
| 4 | [04-database-architecture.md](04-database-architecture.md) | Full Prisma schema, relations, indexes, enums |
| 5 | [05-auth-and-permissions.md](05-auth-and-permissions.md) | Auth flows, sessions, RBAC matrix |
| 6 | [06-member-management.md](06-member-management.md) | Membership lifecycle, portal, businesses, teams |
| 7 | [07-event-management.md](07-event-management.md) | Events, ticketing, RSVP, check-in, analytics |
| 8 | [08-ai-system.md](08-ai-system.md) | Claude integration, services, prompts, governance |
| 9 | [09-payment-system.md](09-payment-system.md) | Stripe: subscriptions, one-off, invoices, webhooks |
| 10 | [10-notification-system.md](10-notification-system.md) | Email + in-app notifications, events, preferences |
| 11 | [11-mobile-architecture.md](11-mobile-architecture.md) | Expo/React Native path, shared API & tokens |

## Architectural principles

1. **API-first** — every capability is a typed service callable by web today and a
   mobile app tomorrow. UI never talks to the DB directly.
2. **One source of truth** — one Postgres database, one schema (Prisma), one set of
   service functions reused by web routes, API, jobs, and AI tools.
3. **Server-first rendering** — React Server Components for fast, SEO-friendly public
   pages; client components only where interactivity demands it.
4. **Role-based everything** — a single RBAC layer guards UI, API, and data.
5. **Mobile-ready from day one** — shared design tokens + shared API contract so the
   native app is a thin client, not a rewrite.
6. **AI as a governed service** — all Claude calls go through one server-side service
   with templates, logging, rate limits, and approval workflows. The API key never
   touches the client.
7. **Secure by default** — secrets in env vars, validated input everywhere, least-
   privilege access, no sensitive data in the client bundle.

## High-level diagram

```
        ┌────────────────────────────────────────────────────────┐
        │                     Clients                             │
        │   Web (Next.js)      Future iOS/Android (Expo RN)       │
        └───────────────┬───────────────────────┬────────────────┘
                        │  typed API (tRPC/REST) │
        ┌───────────────▼───────────────────────▼────────────────┐
        │                  Next.js App (Vercel)                   │
        │  RSC pages │ Route handlers/tRPC │ Server Actions       │
        │  ───────────────────────────────────────────────────── │
        │            Service layer (business logic)               │
        │  Members │ Events │ Directory │ Payments │ AI │ Notify   │
        └───┬─────────┬─────────┬─────────┬─────────┬─────────┬───┘
            │         │         │         │         │         │
        ┌───▼───┐ ┌───▼───┐ ┌───▼───┐ ┌───▼────┐ ┌──▼───┐ ┌───▼────┐
        │Postgres│ │ Blob  │ │Stripe │ │ Claude │ │ ESP  │ │ Queue  │
        │(Prisma)│ │storage│ │  API  │ │  API   │ │email │ │ /cron  │
        └────────┘ └───────┘ └───────┘ └────────┘ └──────┘ └────────┘
```

See `01-system-overview.md` for the concrete technology choice behind each box.
