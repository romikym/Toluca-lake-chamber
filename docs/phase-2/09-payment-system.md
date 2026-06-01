# 09 — Payment System (Stripe)

## Scope
Membership subscriptions, event tickets, donations, sponsorships — all via **Stripe**.
No card data ever touches our servers or DB; Stripe Checkout / Elements handle PCI.

> Safety note: the platform never stores or enters card/bank details on a user's
> behalf. Users enter payment info directly in Stripe-hosted UI.

## Payment types

| Type | Stripe product | Flow |
|------|----------------|------|
| **Membership** | Subscription (Billing) | Checkout → subscription → `Membership` (auto-renew) |
| **Event ticket** | One-off PaymentIntent | Checkout → registration on success |
| **Donation** | One-off or recurring | Checkout / Payment Element → `Donation` |
| **Sponsorship** | Invoice or one-off | Admin-issued invoice → `Sponsorship` |
| **Manual invoice** | Stripe Invoicing | Admin creates → emailed → paid online |

## Subscription → membership mapping
- `MembershipPlan.stripePriceId` per tier.
- Checkout creates Stripe Customer + Subscription → webhook sets `Membership`
  ACTIVE, `stripeSubId`, `expiresAt` = period end.
- Upgrades/downgrades use Stripe proration; plan change reflected on next webhook.
- Lifecycle synced via webhooks:
  - `customer.subscription.updated/deleted` → status (ACTIVE/PAST_DUE/CANCELLED).
  - `invoice.paid` → mark `Invoice` PAID, `Payment` SUCCEEDED, extend membership.
  - `invoice.payment_failed` → PAST_DUE + dunning notification.

## Invoices & receipts
- `Invoice` mirrors Stripe invoices (number, line items, status, PDF URL).
- Receipts from Stripe (`receiptUrl`) surfaced in portal; PDFs downloadable.
- Members see invoices/receipts/payment history in `portal/billing`.

## Webhooks (`/api/webhooks/stripe`)
- Signature-verified (`STRIPE_WEBHOOK_SECRET`), idempotent (event id dedupe).
- Handlers: checkout.session.completed, payment_intent.succeeded/failed,
  invoice.paid/payment_failed, customer.subscription.*, charge.refunded.
- Every webhook → audit log entry.

## Refunds & disputes
- Admin-initiated refunds (permission `billing.manage`, re-auth step) → Stripe refund →
  `Payment` REFUNDED, `Invoice` REFUNDED, membership/registration adjusted.
- Dispute/chargeback webhooks flagged for admin.

## Recurring billing & dunning
- Auto-renew memberships + recurring donations as Stripe subscriptions.
- Failed payments: retry schedule + email reminders; grace period before EXPIRED.

## Admin payment tools
- View payments, invoices, subscriptions; issue invoices; process refunds; revenue
  reports (by tier, event, donations, period); export for accounting.

## Security & compliance
- PCI handled by Stripe (Checkout/Elements); SAQ-A scope.
- Webhook signature verification + idempotency.
- Least-privilege Stripe keys; restricted webhook endpoint.
- Tax/receipts configurable (Stripe Tax optional).

## Services (packages/payments)
`createMembershipCheckout`, `createTicketCheckout`, `createDonation`,
`createInvoice`, `refundPayment`, `syncSubscription`, `handleStripeWebhook`.
