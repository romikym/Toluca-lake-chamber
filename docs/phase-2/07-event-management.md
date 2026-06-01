# 07 — Event Management System

## Overview
Replaces Wix Events with a full ticketing/RSVP platform tied to members, payments,
sponsors, and notifications. Events optionally belong to a **Program** (the 7 signature
programs), so each program page can show its own real upcoming + past events.

## Views
- **List** — upcoming/past filters, program & category filters, search.
- **Calendar** — month / week / agenda; members-only events badged.
- **Detail** — hero, description, time/location + map, ticket types, registration,
  sponsors, photos, share, add-to-calendar (.ics).
- **Member portal** — "My registrations", submit an event.
- **Admin** — create/edit, recurrence, capacity, ticket types, check-in, analytics.

## Registration / ticketing
- **Ticket types** per event: General, Member (member-only pricing), Sponsor, VIP;
  free (RSVP) or paid (`priceCents`).
- **Free RSVP** → `EventRegistration` CONFIRMED immediately.
- **Paid** → Stripe Checkout (one-off) → invoice + registration on success.
- **Member-only** events/prices gated by membership status.
- **Capacity & waitlist** — when full, new signups go `WAITLISTED`; auto-promotion on
  cancellation with notification.
- **Guest registration** — non-account RSVP via name/email (optional account prompt).
- Quantity/multi-ticket; confirmation email with QR code.

## Check-in & attendance
- Admin check-in screen (search/scan QR) → `checkedInAt`, status `ATTENDED`.
- No-show marking; attendance feeds analytics & member engagement scoring.
- Mobile-friendly check-in (works great as a future native admin screen).

## Recurring events
- `recurrenceRule` (iCal RRULE) generates instances (e.g. Community Cleanup = last
  Saturday monthly). Each instance is its own `Event` for registration/analytics.

## Sponsors
- Attach sponsors (`EventSponsor`) with tiers; displayed on event + used in sponsor
  proposals/reports.

## Photos & archive
- Post-event photo gallery (`MediaAsset`), past-events archive per program.

## Analytics (per event + aggregate)
- Registrations over time, conversion (views→reg), attendance rate, revenue, ticket-
  type breakdown, member vs. guest, waitlist size, no-show rate.

## SEO
- Event schema (JSON-LD), OG/Twitter cards, canonical per event, sitemap inclusion.

## Notifications (see doc 10)
- Registration confirmation, 24h/1h reminders, waitlist promotion, cancellation,
  post-event thank-you/feedback.

## Services (services/event.ts, registration.ts)
`createEvent`, `publishEvent`, `generateRecurrences`, `register`, `joinWaitlist`,
`promoteFromWaitlist`, `checkIn`, `cancelRegistration`, `eventAnalytics`.
