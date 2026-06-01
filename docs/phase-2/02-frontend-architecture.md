# 02 — Frontend Architecture

## Rendering strategy (per surface)

| Content | Strategy | Reason |
|---------|----------|--------|
| Home, About, Legacy, FAQ, program pages | **SSG / RSC** (revalidate on publish) | SEO + speed; rarely changes |
| Directory list & profiles | **RSC + dynamic** with cached data + client filters | SEO for profiles; interactive filtering |
| Events list / detail | **RSC** w/ ISR; client for registration | SEO + live availability |
| Member portal | **Dynamic RSC + client components** | Auth-gated, personalized |
| Admin dashboard | **Dynamic, client-heavy** | Tables, charts, CRUD |
| Forms (contact, join, RSVP) | Client components + **Server Actions** | Validation + progressive enhancement |

Default to **React Server Components**; opt into client components only for
interactivity (forms, filters, charts, maps, AI chat, drag/drop).

## App Router structure (`apps/web/app`)

```
app/
├── (public)/                      # marketing site — public layout
│   ├── page.tsx                   # Home
│   ├── about/                     # About, board, legacy, spotlight, faq
│   ├── directory/                 # list + [slug] business profile
│   ├── events/                    # list + [slug] + calendar
│   ├── membership/                # plans + benefits + apply
│   ├── sponsors/ donate/ contact/ newsletter/
│   └── legal/ (privacy, terms)
│
├── (auth)/                        # login, signup, reset — minimal layout
│
├── portal/                        # MEMBER PORTAL — auth-gated layout
│   ├── layout.tsx                 # sidebar/bottom-nav, requires session
│   ├── page.tsx                   # member dashboard (stat cards)
│   ├── profile/ business/ team/
│   ├── events/ (my registrations, submit)
│   ├── billing/ (invoices, receipts, renew, upgrade)
│   ├── announcements/ sponsorships/
│   └── ai/                        # member AI tools
│
├── admin/                         # ADMIN — role-gated layout
│   ├── layout.tsx                 # requires ADMIN/STAFF role
│   ├── page.tsx                   # admin overview + analytics
│   ├── members/ businesses/ events/ sponsors/
│   ├── donations/ invoices/ payments/
│   ├── announcements/ content/ directory/
│   ├── users/ roles/ subscribers/
│   ├── ai/ (logs, controls, approvals)
│   └── reports/
│
├── api/
│   ├── trpc/[trpc]/route.ts
│   ├── v1/...                     # REST for mobile/integrations
│   └── webhooks/ (stripe, resend)
│
├── layout.tsx                     # root: fonts, tokens, providers
└── globals.css                    # token CSS variables + Tailwind
```

Route groups `(public)`, `(auth)`, `portal`, `admin` each own a layout (nav, auth
guard, theming context).

## Component architecture

Three tiers, all in `packages/ui` (except app-specific compositions):

1. **Primitives** — Button, Input, Select, Dialog, Sheet, Tabs, Tooltip, Popover,
   Toast, Avatar, Badge, Card, Table, Skeleton (Radix-based, token-styled).
2. **Patterns** — StatCard, DataTable (sortable/filter/paginate), FilterBar,
   DirectoryCard, EventCard, PlanCard, ProfileCard, Timeline, Accordion, Stepper,
   NotificationItem, AIChatPanel, AIGeneratorModal, MapView, EmptyState, PageHeader.
3. **Compositions** — full sections (Hero, DirectoryGrid, EventCalendar, Member
   DashboardGrid, AdminMembersTable) assembled per route.

All components are **mobile-first**, themeable via tokens, and documented (Storybook
optional) so they translate to React Native equivalents later.

## Design tokens (`packages/tokens`)

Single source for color/spacing/type/radius/shadow/motion, emitted as:
- **CSS variables** (web, via Tailwind preset)
- **JS object** (mobile, via React Native StyleSheet/NativeWind)

```ts
// tokens/colors.ts  (green-only; finalized in Phase 3)
export const color = {
  brand: { 900:'#003021', 700:'#01563C', 500:'#007854', 400:'#478D3C', 300:'#6FB07A' },
  neutral: { 0:'#FFFFFF', 50:'#F7F9F8', 100:'#EEF1F0', 500:'#6B7472', 900:'#1A201E' },
  glass:  { light:'rgba(255,255,255,.55)', dark:'rgba(0,48,33,.45)' },
  // NO yellow tokens — gold roles reassigned to brand/neutral/glass
  semantic: { success:'#007854', warn:'#B8862A', danger:'#B23B3B', info:'#2F6F8F' },
}
```

## State management

| Concern | Tool |
|---------|------|
| Server data (queries/mutations) | **TanStack Query** via tRPC (cache, optimistic) |
| Forms | **React Hook Form + Zod** resolver |
| Local/ephemeral UI state | React state / **Zustand** for cross-component (e.g. filters, cart) |
| URL state (filters, tabs, pagination) | **nuqs** / searchParams (shareable, SSR-friendly) |
| Auth/session | Auth.js session (server) + lightweight client context |
| Theme/motion prefs | Context + CSS vars |

No global Redux; server is the source of truth, Query caches it.

## Forms & data flow

- Validated with one Zod schema shared front+back.
- Submit via **Server Action** (public forms) or **tRPC mutation** (portal/admin).
- Optimistic UI for portal/admin; toast + inline error states.
- Anti-spam: honeypot + rate limit + (optional) Turnstile on public forms.

## Performance

- Route-level code splitting (App Router default) + lazy `dynamic()` for map/charts/AI.
- `next/image` (AVIF/WebP, responsive, blur placeholders).
- Streaming + Suspense for dashboards; skeleton loaders.
- Cached RSC data with tag-based revalidation on content publish.
- Bundle budget enforced in CI.

## Accessibility & responsiveness

- Mobile-first breakpoints; every screen designed phone → tablet → desktop.
- Bottom-nav on mobile portal/admin; sidebar on desktop.
- Radix focus management, keyboard nav, ARIA, color-contrast (green palette tuned for
  AA), reduced-motion variants of every animation.
