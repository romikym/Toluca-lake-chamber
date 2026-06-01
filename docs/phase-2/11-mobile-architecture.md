# 11 — Future Mobile App Architecture

The platform is architected so the mobile app is a **thin client over the same
backend** — not a rewrite. Everything below is enabled by decisions already made in
docs 01–10.

## Approach
- **Expo (React Native) + TypeScript**, added as `apps/mobile` in the same monorepo.
- Consumes the **versioned REST API** (`/api/v1/*`) with JWT auth (already specified
  in docs 03 & 05).
- Reuses **design tokens** (`packages/tokens`) and **Zod validators**
  (`packages/validators`) — identical colors, spacing, type, and input contracts as web.
- Shares business logic conceptually (services live server-side; the app just calls
  the API), so behavior is consistent across platforms.

## What's reused vs. rebuilt

| Shared (no rework) | Rebuilt for native (thin) |
|--------------------|---------------------------|
| Postgres + all services | Screens (RN components) |
| REST API + contracts | Navigation (tabs/stack) |
| Auth (JWT issuance) | Native UI primitives mapped from `packages/ui` |
| Design tokens | Push notifications (Expo) |
| Validators (Zod) | Platform integrations (camera for QR check-in, maps) |
| Stripe (mobile SDK) | Offline cache (TanStack Query persist) |
| Claude AI endpoints | — |

## App structure (screen parity with web surfaces)
```
apps/mobile/
├── (auth)/        login, signup, reset
├── (tabs)/        Home · Directory · Events · Portal · More
│   ├── home       featured events/members, stats
│   ├── directory  search, filters, map, profile
│   ├── events     list/calendar, detail, register, my tickets
│   ├── portal     member dashboard, profile, business, billing, AI tools
│   └── ai         chat assistant
└── admin/         (optional) check-in, approvals, quick admin
```
Bottom-tab navigation mirrors the web mobile bottom-nav; every web screen already
designed mobile-first has a direct native counterpart.

## Native-specific capabilities
- **Push notifications** (Expo Push) wired into the existing notification dispatcher
  (doc 10) as a third channel.
- **QR check-in** using device camera (admin event check-in).
- **Maps** (react-native-mapbox) sharing the same data as web directory/events.
- **Stripe mobile SDK** (PaymentSheet) for memberships/tickets/donations.
- **Biometric unlock** for portal access (optional).
- **Deep links / universal links** to events, businesses, articles.

## Auth on mobile
- Login → REST issues access JWT + refresh token (doc 05).
- Secure storage (Expo SecureStore); silent refresh; logout revokes refresh token.
- OAuth via Expo AuthSession.

## Offline & performance
- TanStack Query with persistence for directory/events read caching.
- Optimistic updates for RSVP, profile edits.
- Image caching; token-driven theming for instant brand consistency.

## Delivery
- Expo EAS Build + OTA updates for fast iteration.
- App Store / Play Store submission when ready.
- Same staging/prod API environments (doc 01).

## Why this is low-risk
Because the web app already (a) talks to the backend only through typed APIs, (b)
centralizes logic in services, (c) shares tokens/validators, and (d) was designed
mobile-first, the native app is primarily a **presentation layer** — the expensive
parts (data model, business rules, payments, AI, auth) are already built and shared.
