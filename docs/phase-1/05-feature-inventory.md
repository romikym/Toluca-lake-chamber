# 05 — Feature Inventory (functional capabilities & integrations)

## Features that exist today (Wix-native)

| Feature | Status | Backed by | Migration target |
|---------|--------|-----------|------------------|
| Marketing pages | ✅ Live | Wix Studio CMS | Custom Next.js pages |
| Business directory | ⚠️ Basic | **Wix site search** (`/search`) | True directory: search, filter, map, profiles |
| Industry taxonomy (14 categories) | ✅ Live | Wix | Reuse as DB taxonomy |
| Member directory listings (120) | ✅ Live | Wix collection | Migrate to `businesses` table |
| Events list + calendar | ✅ Live | Wix Events | Custom events system |
| Event detail + registration state | ⚠️ Partial | Wix Events | Real RSVP + ticketing |
| Membership pricing (5 tiers) | ✅ Live | Wix Pricing Plans | `membership_plans` + checkout |
| "Buy Now" / join | ⚠️ Basic | Wix Pricing Plans + Pay | Stripe-backed join flow |
| Member login / self-service | ⚠️ Basic | Wix Members Area | Custom auth + member portal |
| Contact form | ✅ Live | Wix Forms | Backend form + notifications |
| Newsletter signup | ✅ Live | Wix | Double opt-in + subscriber DB / ESP |
| Donations | ⚠️ Basic | Wix/PayPal (assumed) | Stripe donations |
| Spotlight/blog feed | ⚠️ Thin (1 post) | Wix | News/articles CMS |
| FAQ | ✅ Live | Static | Accordion + AI assistant |
| Social links | ✅ Live | — | Keep |
| SEO basics (titles) | ⚠️ Minimal | Wix | Full SEO system |

Legend: ✅ working · ⚠️ exists but minimal/limited.

## Features the brief requires that DON'T exist yet (net-new)

### Member experience
- Member portal/dashboard (profile, listing mgmt, image upload, contact updates)
- Membership renewals, upgrades, status tracking
- Invoices, receipts, payment history
- Benefits tracking
- Team-member management (multiple users per business)
- Member-submitted announcements & events
- Sponsorship management
- Saved searches, business comparison

### Events
- Real registration, ticketing, RSVP, waitlists
- Check-in & attendance tracking
- Event analytics, recurring events
- Event photos & past-events archive
- Sponsor attachment to events

### Admin
- Admin dashboard (members, events, sponsors, donations, invoices, payments,
  announcements, directory, users, permissions, subscribers, content, analytics,
  reports)
- Roles & permissions system
- Approval workflows (membership, submissions, AI content)

### AI (Claude-powered)
- Public assistants: chamber assistant, FAQ, community guide, business discovery,
  event recommendations, support
- Member AI tools: business descriptions, SEO, event listings, announcements, social
  posts, newsletters, press releases, sponsorship requests, profile/marketing content
- Admin AI tools: newsletters, event content, member spotlights, sponsor proposals,
  press releases, form summaries, reports, social content, membership-trend analysis,
  inactive-member identification, engagement recommendations
- AI backend: secure Claude API integration, env-var key mgmt, prompt templates,
  reusable services, usage tracking/logging, admin controls, approval workflow, rate
  limiting

### Payments
- Stripe: membership payments, event payments, donations, sponsorships, invoices,
  receipts, recurring billing

### Platform / cross-cutting
- Authentication & authorization (custom)
- Notification system (email + in-app)
- Advanced SEO (schema: Organization, LocalBusiness, Event; OG/Twitter; sitemap;
  robots; breadcrumbs; SEO scoring)
- Performance (image optimization, lazy loading, code splitting, caching, CDN)
- Accessibility compliance
- Mobile-app-ready architecture (shared API, design tokens, screen parity for
  iOS/Android/tablet)
- Premium animation framework

## Integrations observed / implied

| Integration | Current | Target |
|-------------|---------|--------|
| Payments | Wix Pay / PayPal (assumed) | **Stripe** |
| Email/newsletter | Wix | ESP (e.g. Resend/Postmark + list tool) |
| Maps | none | Map provider for directory/events |
| AI | none | **Anthropic Claude API** |
| Auth | Wix Members | Custom (e.g. Auth.js / Clerk-style) |
| Analytics | Wix basic | Product + web analytics |

## Data entities implied by current site (feeds DB design in Phase 2)

Users · Members · Businesses (120, 14 categories) · Membership plans (5) · Events ·
Event registrations · Programs · Board members (~18) · Spotlight/news articles ·
FAQs (7) · Newsletter subscribers · Contact submissions · Donations · Media assets ·
Legal pages.
