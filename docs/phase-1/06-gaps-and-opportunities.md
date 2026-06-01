# 06 — Gaps, Weak Areas & Opportunities

## A. Content bugs / inconsistencies (fix during migration)

1. **Founding year conflict** — Home & About say **1939**; FAQ says **1938**. Pick one
   (confirm with client) and use it everywhere.
2. **Pancake Breakfast Fundraiser page** (`/pancakebreakfastfundraiser`) shows the
   **Networking Mixers** description by mistake. Needs correct copy.
3. **Confusing page names** —
   - `/abouttolucalake` is titled **"Toluca Lake Spotlight"** (a blog feed).
   - `/thetolucalakelegacy` is titled **"About Toluca Lake"** (the history timeline).
   Rename so URL, title, and content agree.
4. **Spotlight is nearly empty** — only one post (Dec 2023, "100th Anniversary"). Feed
   looks abandoned; needs content plan or repositioning.
5. **Program pages are dead-ends** — each just says "Click Here for Upcoming Events"
   but doesn't link to its own events; no dates, no past recaps, no photos.
6. **Event data looks stale/duplicated** — all three "upcoming" events are
   "Community Cleanup," with 2025 dates surfacing as "upcoming" in a 2026 calendar.
7. **Mission stated twice, slightly differently** (Home vs About) — unify.

## B. Structural / UX weaknesses

8. **Directory is just site-search** — `/search` returns "Members / Events / Other
   Pages," i.e. it isn't a purpose-built directory. No rich profiles, map, featured
   tiers, tags, or comparison. This is the single biggest upgrade opportunity.
9. **No real member portal** — login leads to Wix's generic members area; none of the
   self-service depth the client wants (listing management, invoices, team, AI tools).
10. **No admin tooling** — everything is edited inside Wix; no role-based admin
    dashboard, approvals, analytics, or reporting.
11. **Forms are presentational** — contact/newsletter have no visible validation,
    spam protection, confirmation UX, or CRM/notification pipeline.
12. **"About Us" menu overloaded** — mission, board, history, spotlight, FAQ all under
    one dropdown; five different content types.
13. **No clear conversion funnel** — Join/Donate CTAs exist but there's no guided
    onboarding, benefit-driven landing, or social proof (testimonials, member logos,
    impact stats) on the way to joining.

## C. Visual / brand weaknesses

14. **Heavy yellow/gold** dominates nav bands, buttons, and section backgrounds —
    explicitly being removed; reads dated and lowers the premium feel.
15. **Inconsistent typography** — Madefor + Montserrat + Helvetica + Times all in play.
16. **Generic Wix-template aesthetic** — wave dividers, default cards; not the
    premium, app-like, glassmorphic experience targeted.
17. **"Built on Wix Studio" attribution** at the top of every page — unprofessional
    for a chamber brand; gone in the rebuild.
18. **Animations are decorative reveals only** — no purposeful micro-interactions,
    transitions, or app-like motion system.

## D. Technical / platform weaknesses

19. **Fully client-rendered, no SSR/SEO depth** — content invisible to plain fetch;
    minimal meta, no structured data (Organization/LocalBusiness/Event schema), likely
    weak local SEO for a *local* chamber.
20. **Locked into Wix** — no API, no data ownership/export path, no mobile-app reuse,
    limited extensibility for AI/payments/automation.
21. **No notification infrastructure** (email/in-app) tied to membership/events/forms.
22. **No analytics/reporting** beyond Wix basics; client wants membership-trend and
    engagement insight.

## E. Opportunities (what the rebuild unlocks)

- **Best-in-class directory** — filter by 14 categories, search, map, featured/premium
  tiers, rich profiles, comparison, AI business discovery. Turns a static list of 120
  members into the platform's flagship feature.
- **True member portal** — self-serve listing/profile management, renewals, invoices,
  receipts, benefits tracking, team management, member-submitted events/announcements,
  AI content tools. Drives retention and reduces admin load.
- **Real event platform** — ticketing, RSVP, waitlists, check-in, attendance, sponsor
  attribution, photo archives, recurring events, analytics.
- **Claude AI throughout** — assistants for visitors + content-generation tools for
  members and admins; a genuine differentiator vs. every other chamber site.
- **Admin command center** — manage members/events/sponsors/donations/payments/content
  with approvals, analytics, and reports.
- **Local SEO leadership** — schema, OG/Twitter, sitemap, fast SSR; own local search
  for "Toluca Lake" + each member business.
- **Mobile-app-ready** — shared API + design tokens + screen parity so iOS/Android
  apps are a thin client over the same backend.
- **Brand elevation** — green-only premium palette, glassmorphism, refined type, and a
  disciplined motion system; finally drop the Wix look and the yellow.
- **Data ownership** — own the database; export, automate, integrate freely.

## F. Things to obtain from the client (inputs needed)

- Original **logo source files** (SVG/AI) + brand assets.
- **The dashboard reference image** cited in the brief (for Phase 3 visual direction) —
  *not received yet.*
- Full **member roster** export (all 120 businesses w/ contact, category, logos).
- All **event** and **board** images at original resolution.
- Decision on **founding year** (1938 vs 1939).
- Confirmed **legal text** (Privacy/Terms) and any compliance needs.
- **Payment processor** preference (brief says Stripe — confirm) + bank/tax details
  handled by client directly (never by us).
- Existing **domain**, email/ESP, analytics accounts.
