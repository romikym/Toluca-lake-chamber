# 🔌 Go-Live Connection Checklist

Everything you need to set up to take the platform from "runs locally with fallbacks"
to "fully live in production." The app **runs today without any of these** — each is
wired with a graceful fallback. Add them when you're ready.

> Legend: 🟢 = required to go live · 🟡 = recommended · ⚪ = optional / later phase
> Status: ⬜ not done · ✅ done

Put real values in **`.env.local`** (gitignored), never in `.env`.

---

## 1. 🟢 Database (production) — ⬜
Local dev uses **SQLite** (zero-setup). Production needs **Postgres**.

- **Pick a provider:** Neon, Supabase, or Amazon RDS (any Postgres works).
- **Get:** a connection string.
- **Set:**
  ```
  DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME?sslmode=require"
  ```
- **Switch** `prisma/schema.prisma` datasource `provider = "sqlite"` → `"postgresql"`.
- **Run:** `npx prisma migrate deploy` (or `db push`) then `npm run db:seed`.
- _Note:_ a few fields use `String` for enums/JSON for SQLite portability — they work
  on Postgres unchanged, or can be upgraded to native enums/`Json` later.

## 2. 🟢 Authentication secret — ⬜
- **Generate:** `npx auth secret` (or any 32+ char random string).
- **Set:**
  ```
  AUTH_SECRET="<random-string>"
  AUTH_TRUST_HOST=true
  ```
- After launch, **change the seeded demo passwords** (admin123 / member123) or remove
  the demo users from `prisma/seed.ts`.

## 3. 🟢 Stripe (payments) — ⬜
Powers membership subscriptions, event tickets, and donations.

- **Create** a Stripe account → get **API keys**.
- **Set:**
  ```
  STRIPE_SECRET_KEY="sk_live_..."        # or sk_test_... while testing
  STRIPE_WEBHOOK_SECRET="whsec_..."
  ```
- **Add a webhook endpoint** in the Stripe Dashboard pointing to:
  `https://YOUR_DOMAIN/api/webhooks/stripe`
  Events to send: `checkout.session.completed`, `invoice.payment_failed`.
  Copy its signing secret into `STRIPE_WEBHOOK_SECRET`.
- _No Price IDs needed_ — checkout uses inline pricing from the DB plans.
- **Test locally:** `stripe listen --forward-to localhost:3000/api/webhooks/stripe`.

## 4. 🟢 Email (Resend) — ⬜
Transactional email (welcome, receipts, confirmations, admin alerts).

- **Create** a Resend account → **verify your sending domain** (DNS records).
- **Set:**
  ```
  RESEND_API_KEY="re_..."
  EMAIL_FROM="Toluca Lake Chamber <hello@tolucalakechamber.com>"
  ```
- Until a domain is verified you can send from `onboarding@resend.dev` (test only).

## 5. 🟡 Claude AI — ⬜
Powers the site assistant and member/admin content tools.

- **Get** an Anthropic API key.
- **Set:**
  ```
  ANTHROPIC_API_KEY="sk-ant-..."
  AI_MODEL_DEFAULT="claude-3-5-haiku-latest"   # or a larger model
  ```
- Without it, the assistant uses a built-in keyless fallback (canned answers).

## 6. 🟢 Hosting (Vercel) — ⬜
- **Create** a Vercel project from the repo.
- **Add all env vars** above in Project → Settings → Environment Variables.
- **Connect your domain** (`tolucalakechamber.com`) + DNS.
- Update hard-coded production URL in `src/app/layout.tsx` (`metadataBase`),
  `src/app/sitemap.ts`, and `src/app/robots.ts` to the real domain.

## 7. ⚪ Maps (Google Maps Embed) — ⬜
Powers the location map on each directory listing. **Without a key it still
works** — listings show a styled fallback that links out to Google Maps.

To enable embedded maps:
1. In [Google Cloud Console](https://console.cloud.google.com/), create a
   project and enable **billing** (Google gives a $200/mo free credit).
2. Enable the **Maps Embed API**.
3. Create an **API key** (APIs & Services → Credentials).
4. Restrict it: Application restriction → **HTTP referrers** → add
   `https://toluca-lake-chamber.netlify.app/*` and your real domain;
   API restriction → **Maps Embed API** only.
5. **Set:**
   ```
   GOOGLE_MAPS_API_KEY="AIza..."
   ```
- Future add-ons (optional): Maps JavaScript + Geocoding (one directory-wide
  map with pins), Places Autocomplete (clean address entry), Place Details
  (auto-pull Google hours/photos/reviews — needs a Place ID per business).

## 8. ⚪ OAuth social login (Google) — ⬜
Optional faster sign-in (architecture supports it; not yet enabled).
```
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."
```

## 9. ⚪ Rate limiting / cache (Upstash Redis) — ⬜
Recommended before heavy public traffic / AI abuse protection.
```
UPSTASH_REDIS_REST_URL="..."
UPSTASH_REDIS_REST_TOKEN="..."
```

## 10. ⚪ Analytics (PostHog / Vercel) — ⬜
```
NEXT_PUBLIC_POSTHOG_KEY="..."
```

## 11. ⚪ Mobile app (Expo) — ⬜
The native app lives in `apps/mobile/`. To run/ship it:
- **Point it at the API:** in `apps/mobile/.env.local` set
  `EXPO_PUBLIC_API_URL=https://YOUR_DOMAIN` (or your LAN IP in dev).
- **Build & submit:** an **Expo / EAS** account for `eas build` + App Store / Play
  Store developer accounts when you're ready to publish.
- Future: mobile JWT auth secret, Expo Push credentials, Stripe mobile key.

---

## Content & assets to provide (not env vars)
- ⬜ **Logo source files** (SVG/AI) + brand assets.
- ⬜ **Full 120-member roster** export (name, contact, category, logos) to replace seed data.
- ⬜ **Board photos**, event images, sponsor logos (original resolution).
- ⬜ **Founding-year decision** — site says 1939, the old FAQ said 1938. Pick one.
- ⬜ **Legal review** of Privacy Policy & Terms (current text is a working draft).
- ⬜ **The "dashboard reference" image** from the original brief (for final visual polish).

## Quick map: what breaks without each key
| Missing | Behavior today (fallback) |
|---------|---------------------------|
| Postgres | Uses local SQLite |
| Stripe | Payments record `SIMULATED` rows, no charge |
| Resend | Emails log to server console, not sent |
| Anthropic | AI assistant gives canned answers |
| Mapbox | (Maps not built yet) |

_Last updated: after the Email phase. Updated as phases complete._
