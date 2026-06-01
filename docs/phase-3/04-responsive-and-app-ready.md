# 04 — Responsive & App-Ready Design

Every component and screen is designed **mobile-first** and has a clear native
counterpart, so the future Expo app (doc 11) is a thin presentation layer. Same tokens,
same layout logic, same information hierarchy across phone → tablet → desktop.

## Mobile-first rules
- Design the phone layout first; enhance upward. Content and primary action must work
  in a single column at 360px.
- **Touch targets ≥ 44×44px**; 8px min spacing between tappable elements.
- Thumb-friendly: primary actions reachable in the lower half on mobile.
- Type never below 14px for body on mobile; 16px inputs (avoids iOS zoom).
- No hover-only affordances; every hover action has a tap/long-press equivalent.
- Generous tap padding on icons/links; sticky primary CTAs where useful.

## Navigation by surface

### Public site
- **Mobile:** top bar (logo + hamburger + search). Hamburger → full-height glass drawer
  with sections, Join/Donate CTAs, social. Spring-slide.
- **Desktop:** glass top bar + mega-dropdowns.

### Member portal & Admin
- **Mobile:** **bottom navigation bar** (5 items max) + top bar for context/back.
  - Portal bottom nav: **Home · Directory · Events · Wallet/Billing · Profile** (or
    More). AI assistant = floating action button.
  - Admin bottom nav: **Overview · Members · Events · Approvals · More**.
- **Tablet:** collapsible icon rail (sidebar collapsed to icons).
- **Desktop:** full labeled sidebar + top bar.

Active state = green pill + indicator; transitions via shared layout animation.

## Layout adaptation
| Pattern | Phone | Tablet | Desktop |
|--------|-------|--------|---------|
| Stat tiles | 1–2 col | 3 col | 4–6 col |
| Directory grid | 1 col | 2 col | 3–4 col |
| Event list | stacked cards | 2 col | list + map split |
| Tables | stacked cards | scroll/condensed | full table |
| Forms | single column, sticky CTA | single, wider | 2-col where sensible |
| Detail + sidebar | stacked (content → meta) | content + drawer | content + sticky aside |
| Filters | bottom-sheet trigger | inline drawer | persistent left rail |

## Gestures & touch UX
- **Swipe:** carousels (featured members/events), image galleries, dismiss sheets,
  swipe-actions on list rows (admin: approve/reject).
- **Pull-to-refresh** on feed-like lists (native app + PWA).
- **Long-press:** quick actions / context menu.
- **Bottom sheets** for filters, pickers, actions on mobile (vs. popovers on desktop).
- Momentum scrolling; sticky section headers; safe-area insets respected.

## Key screen specs (web ⇄ native parity)

| Screen | Mobile layout | Native counterpart |
|--------|---------------|--------------------|
| **Home** | Hero (glass card) → stat strip → featured events carousel → featured members → CTA | Same, scroll feed |
| **Directory** | Search + filter sheet → result cards → map toggle (full-screen map) | Tab w/ search + map |
| **Business profile** | Cover → logo/name → actions → tabs (About/Photos/Events/Contact) | Stack screen |
| **Events** | Segmented (List/Calendar) → cards → filters sheet | Tab + detail |
| **Event detail** | Cover → meta → sticky Register bar → details → map | Stack + PaymentSheet |
| **Member dashboard** | Greeting → status ring → stat tiles (1–2col) → quick actions → activity | Tab home |
| **Profile/Business edit** | Sectioned form, sticky save, image upload w/ preview | Stack forms |
| **Billing** | Plan card → invoices list → receipts → manage payment | Stack |
| **AI chat** | Full-screen glass chat, suggested prompts, streaming | Modal/screen |
| **Admin tables** | Card list + swipe actions + filter sheet | Stack lists |
| **Event check-in** | Search/QR scan, big confirm | Camera screen (native) |

## Tablet optimizations
- Two-pane master–detail (list left, detail right) for directory, events, admin.
- Sidebar as icon rail; modals become side sheets where space allows.
- Multi-column forms and dashboards at md+.

## Performance on mobile
- Lazy-load map, charts, AI panel, heavy images.
- Responsive `next/image` srcsets; AVIF/WebP; blur placeholders.
- Skeletons over spinners; optimistic actions (RSVP, save, edit).
- Minimize JS on public pages (RSC); defer non-critical.

## Accessibility (all breakpoints)
- WCAG 2.2 AA contrast (green palette pre-checked).
- Full keyboard nav + visible focus rings; logical tab order.
- Screen-reader labels on icons/controls; ARIA for tabs/menus/dialogs.
- Respect reduced-motion, larger text settings, and safe areas.
- Forms: associated labels, error announcements, no color-only signaling.

## PWA (bridge to native)
- Installable PWA (manifest + service worker) as an interim mobile experience before
  the Expo app ships: offline shell, add-to-home, push (where supported). Reuses the
  same responsive UI — a natural stepping stone to the native build (doc 11).
