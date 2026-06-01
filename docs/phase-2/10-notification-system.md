# 10 — Notification System

## Channels
- **Email** (transactional via Resend; broadcast/newsletter via list tool).
- **In-app** (`Notification` table → notification center + badge in portal/admin).
- **Future: push** (mobile, via Expo push) — same dispatch layer.

User preferences per category control channel (`IN_APP` / `EMAIL` / `BOTH` / off).

## Dispatch architecture
```
Domain event (service emits) ─▶ Notification dispatcher (packages/notifications)
   ├─ resolve recipients + preferences
   ├─ render template (React Email)
   ├─ write Notification row (in-app)
   ├─ enqueue email (Resend) — retryable via queue
   └─ (future) push via Expo
```
Triggered from services (never from UI). Batched/digest sends run as cron jobs.

## Notification catalog

| Event | Recipient | Channels |
|-------|-----------|----------|
| Welcome / email verification | New user | Email |
| Membership approved / rejected | Member | Email + in-app |
| Membership expiring (30/7/1d) | Member | Email + in-app |
| Payment succeeded / receipt | Member | Email |
| Payment failed / past due (dunning) | Member | Email + in-app |
| Renewal confirmation | Member | Email + in-app |
| Team invite | Invitee | Email |
| Event registration confirmation (+QR) | Registrant | Email + in-app |
| Event reminder (24h / 1h) | Registrant | Email + in-app |
| Waitlist promotion | Registrant | Email + in-app |
| Event cancelled/changed | Registrants | Email + in-app |
| Post-event thank-you / feedback | Attendees | Email |
| Submission approved/rejected (event/announcement) | Submitter | In-app + email |
| AI draft ready for review | Admin/staff | In-app |
| New contact submission | Staff | In-app + email |
| New member joined | Admin | In-app |
| Newsletter / digest | Subscribers | Email (broadcast) |

## Newsletter & broadcast
- Double opt-in (`NewsletterSubscriber` PENDING → CONFIRMED).
- Admin composes (optionally AI-drafted) → preview → schedule/send → broadcast.
- Unsubscribe + preference center; bounce/complaint handling via Resend webhooks.

## Notification center (in-app)
- Bell + unread badge; list with read/unread, links to the relevant page; mark-all-read.
- Real-time-ish via polling/Query invalidation (upgradeable to websockets).

## Preferences
- `Setting`/user-preference store: per-category channel choice, quiet hours, digest
  vs. immediate. Respected by dispatcher.

## Reliability
- Queue with retries + idempotency keys (no duplicate sends).
- Delivery status tracked; failures surfaced to admin.
- Rate/throttle on bulk sends.

## Services (packages/notifications)
`notify(type, recipients, data)`, `sendEmail(template, to, data)`,
`createInAppNotification(...)`, `sendBroadcast(campaign)`, `handleResendWebhook`.
