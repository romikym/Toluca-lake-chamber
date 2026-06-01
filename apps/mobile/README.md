# Toluca Lake Chamber — Mobile App (Expo / React Native)

A native iOS/Android app that's a thin client over the **same backend** as the web
platform. It reuses the green design tokens and reads the public REST API
(`/api/v1/*`).

## Run it

From `apps/mobile/`:

```bash
npm install
npx expo start
```

Then press **i** (iOS simulator), **a** (Android emulator), or scan the QR code with
**Expo Go** on your phone.

### Point it at your backend

The app needs your running web app's URL. Create `apps/mobile/.env.local`:

```
EXPO_PUBLIC_API_URL=http://localhost:3000
```

- **iOS simulator / web:** `http://localhost:3000` works.
- **Android emulator:** use `http://10.0.2.2:3000`.
- **Physical phone (Expo Go):** use your computer's LAN IP, e.g.
  `http://192.168.1.50:3000` (make sure the web app is running and reachable).

Start the web app first (`npm run dev` in the repo root) so the API is live.

## What's here

```
app/
├── _layout.tsx              # root Stack
├── (tabs)/
│   ├── _layout.tsx          # bottom tab bar
│   ├── index.tsx            # Home (hero, featured events & members)
│   ├── directory.tsx        # searchable business directory
│   ├── events.tsx           # events list
│   ├── membership.tsx       # plans & pricing
│   └── account.tsx          # account / links
├── directory/[slug].tsx     # business profile
└── events/[slug].tsx        # event detail + RSVP
src/
├── theme.ts                 # design tokens (mirrors the web system)
├── api.ts                   # typed REST client
├── useApi.ts                # data-fetching hook
└── components/ui.tsx        # Card, Badge, Avatar, Cover, Loading…
```

## Architecture notes

- **Shared backend:** all data comes from the web app's `/api/v1/*` endpoints — no
  duplicated business logic. The same database powers web and mobile.
- **Shared design language:** `src/theme.ts` mirrors the web `@theme` tokens
  (green-only palette). In a full monorepo these would live in a shared
  `packages/tokens` consumed by both.
- **Next steps** (per `docs/phase-2/11-mobile-architecture.md`): JWT auth against the
  API, push notifications (Expo Push) wired to the existing notification system,
  Stripe PaymentSheet for in-app checkout, and QR check-in for event staff.
