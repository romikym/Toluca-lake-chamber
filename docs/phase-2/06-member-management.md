# 06 — Member Management System

## Membership lifecycle

```
Prospect ─▶ Sign up ─▶ Choose plan ─▶ Stripe checkout ─▶ PENDING
   ▲                                                        │
   │                                              Admin review/approval
   │                                                        │
Lapsed ◀─ EXPIRED ◀─ (no renewal) ◀── ACTIVE ◀──────────────┘
   │                      │  │
   │           renew/upgrade  auto-renew (Stripe sub)
   └───── reactivate ◀────┘
```

States map to `MembershipStatus`: PENDING → ACTIVE → PAST_DUE → EXPIRED / CANCELLED /
REJECTED.

## Capabilities

### Join flow
- Plan selection (5 tiers) → account → Stripe Checkout (subscription) → membership
  `PENDING` → approval workflow → `ACTIVE`, listing goes `PUBLISHED`.
- Residents skip the business steps (no listing).
- Full refund path if rejected (per current FAQ policy).

### Renewals & upgrades
- Auto-renew via Stripe subscription; reminders at 30/7/1 days (see notifications).
- Manual renew (one-click) for non-auto members.
- Upgrade/downgrade between tiers with proration (Stripe).
- Status tracking surfaced as a **membership badge** (Active / Expiring / Past due).

### Business listing management (member portal)
- Edit profile: name, tagline, rich description, contact, website, hours, socials,
  address (geocoded to lat/lng for map).
- Media: upload logo, cover, gallery (image pipeline + alt text).
- Categories: assign from the 14 industries.
- Preview + publish (publish may require admin approval depending on settings).
- Directory tier (Standard/Featured/Premium) drives placement & profile richness.

### Team management
- Owner invites teammates (`BusinessMember` + `BusinessRole`).
- Roles: Owner / Manager / Editor / Viewer.
- Team members manage the listing, submit events/announcements (per role), use member
  AI tools — without billing access.

### Billing self-service
- View invoices & receipts (PDF), payment history, current plan, next renewal.
- Update payment method (Stripe customer portal embed).
- Download receipts.

### Submissions
- Submit events and announcements → enter approval queue → published on approval.
- Submit/manage sponsorships.

### Member AI tools (see doc 08)
- Generate/improve business description, SEO, event listings, announcements, social
  posts, newsletters, press releases, sponsorship requests, marketing content.

## Member dashboard (portal home)
Stat cards + quick actions:
- Membership status & days to renewal · Listing completeness % · Profile views ·
  Upcoming registered events · Pending invoices · Recent announcements · AI tool
  shortcuts · Notifications.

## Admin member management
- CRUD members/businesses, approve/reject memberships & submissions, change tiers,
  manage team, issue/void invoices, refunds, export.
- **Insights**: new vs. churned members, expiring soon, inactive members (AI-assisted),
  engagement scoring, revenue by tier.

## Services (packages/api/services/member.ts, business.ts, membership.ts)
`createMembership`, `approveMembership`, `renewMembership`, `changePlan`,
`updateBusiness`, `publishListing`, `inviteTeamMember`, `setBusinessRole`,
`computeListingCompleteness`, `findExpiringMemberships`, `flagInactiveMembers`.
