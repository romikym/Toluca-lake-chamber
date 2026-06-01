# 04 — Database Architecture

PostgreSQL via Prisma. This is the **reference schema** (illustrative, not yet code).
It covers every entity implied by Phase 1 plus the new platform features. IDs are
`cuid()`; all tables have `createdAt`/`updatedAt`; soft-delete (`deletedAt`) on
member-facing records.

## Entity map

```
User ─┬─< Account/Session (auth)
      ├─< Membership >── MembershipPlan
      ├─< BusinessMember >── Business ──< BusinessCategory >── Category
      │                         ├─< MediaAsset
      │                         ├─< Announcement
      │                         └─< Sponsorship >── Sponsor
      ├─< EventRegistration >── Event ──< TicketType
      │                          ├─< EventSponsor >── Sponsor
      │                          └─ Program (signature program)
      ├─< Invoice >──< Payment      (Stripe)
      ├─< Donation                  (Stripe)
      ├─< Notification
      ├─< AiUsageLog / AiDraft
      └─ Role/Permission (RBAC)

NewsletterSubscriber, ContactSubmission, Article (spotlight/news),
BoardMember, Faq, Page (legal/content), Setting, AuditLog, SavedSearch
```

## Core schema (Prisma, illustrative)

```prisma
// ---------- Auth & Users ----------
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  emailVerified DateTime?
  name          String?
  phone         String?
  image         String?
  passwordHash  String?                  // null when OAuth/magic-link only
  status        UserStatus @default(ACTIVE)
  roles         UserRole[]
  accounts      Account[]
  sessions      Session[]
  memberships   Membership[]
  businessLinks BusinessMember[]
  registrations EventRegistration[]
  invoices      Invoice[]
  donations     Donation[]
  notifications Notification[]
  savedSearches SavedSearch[]
  aiUsage       AiUsageLog[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  deletedAt     DateTime?
  @@index([status])
}

enum UserStatus { ACTIVE SUSPENDED PENDING }

model Account  { id String @id @default(cuid()) userId String user User @relation(fields:[userId],references:[id]) provider String providerAccountId String /* ...OAuth fields */ @@unique([provider, providerAccountId]) }
model Session  { id String @id @default(cuid()) userId String user User @relation(fields:[userId],references:[id]) expires DateTime sessionToken String @unique }

// ---------- RBAC ----------
model Role        { id String @id @default(cuid()) key RoleKey @unique name String permissions RolePermission[] users UserRole[] }
model Permission  { id String @id @default(cuid()) key String @unique description String roles RolePermission[] }
model RolePermission { roleId String permissionId String role Role @relation(fields:[roleId],references:[id]) permission Permission @relation(fields:[permissionId],references:[id]) @@id([roleId, permissionId]) }
model UserRole    { userId String roleId String user User @relation(fields:[userId],references:[id]) role Role @relation(fields:[roleId],references:[id]) @@id([userId, roleId]) }

enum RoleKey { SUPER_ADMIN ADMIN STAFF BOARD MEMBER_OWNER MEMBER_TEAM SUBSCRIBER }

// ---------- Membership ----------
model MembershipPlan {
  id            String   @id @default(cuid())
  key           String   @unique          // business_small, business_mid, business_large, nonprofit, resident
  name          String
  description    String?
  audience      PlanAudience               // BUSINESS, NONPROFIT, RESIDENT
  priceCents    Int                        // 15000, 20000, 30000, 13000, 5000
  interval      BillingInterval @default(YEAR)
  employeeMin   Int?
  employeeMax   Int?
  benefits      Json                       // structured benefit list
  stripePriceId String?
  isActive      Boolean  @default(true)
  sortOrder     Int      @default(0)
  memberships   Membership[]
}
enum PlanAudience { BUSINESS NONPROFIT RESIDENT }
enum BillingInterval { MONTH YEAR }

model Membership {
  id              String   @id @default(cuid())
  userId          String
  user            User     @relation(fields:[userId], references:[id])
  planId          String
  plan            MembershipPlan @relation(fields:[planId], references:[id])
  businessId      String?               // null for residents
  business        Business? @relation(fields:[businessId], references:[id])
  status          MembershipStatus @default(PENDING)
  startedAt       DateTime?
  expiresAt       DateTime?
  autoRenew       Boolean  @default(false)
  stripeSubId     String?  @unique
  approvedById    String?
  approvedAt      DateTime?
  invoices        Invoice[]
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  @@index([status, expiresAt])
}
enum MembershipStatus { PENDING ACTIVE PAST_DUE EXPIRED CANCELLED REJECTED }

// ---------- Business / Directory ----------
model Business {
  id           String   @id @default(cuid())
  slug         String   @unique
  name         String
  tagline      String?
  description  String?                  // rich text
  email        String?
  phone        String?
  website      String?
  address      String?
  city         String?  @default("Toluca Lake")
  state        String?  @default("CA")
  zip          String?
  lat          Float?
  lng          Float?
  hours        Json?
  socials      Json?                    // {instagram, facebook, ...}
  logoUrl      String?
  coverUrl     String?
  tier         DirectoryTier @default(STANDARD)  // STANDARD, FEATURED, PREMIUM
  status       ListingStatus @default(DRAFT)
  members      BusinessMember[]
  categories   BusinessCategory[]
  media        MediaAsset[]
  announcements Announcement[]
  sponsorships  Sponsorship[]
  membership   Membership[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  deletedAt    DateTime?
  @@index([status, tier])
  @@index([city, state])
}
enum DirectoryTier { STANDARD FEATURED PREMIUM }
enum ListingStatus { DRAFT PENDING PUBLISHED HIDDEN }

model BusinessMember {                 // team members per business (multi-user)
  id         String @id @default(cuid())
  businessId String
  userId     String
  role       BusinessRole @default(EDITOR)  // OWNER, MANAGER, EDITOR, VIEWER
  business   Business @relation(fields:[businessId], references:[id])
  user       User     @relation(fields:[userId], references:[id])
  @@unique([businessId, userId])
}
enum BusinessRole { OWNER MANAGER EDITOR VIEWER }

model Category {
  id        String @id @default(cuid())
  key       String @unique
  name      String                     // 14 industries from Phase 1
  icon      String?
  sortOrder Int @default(0)
  businesses BusinessCategory[]
}
model BusinessCategory { businessId String categoryId String business Business @relation(fields:[businessId],references:[id]) category Category @relation(fields:[categoryId],references:[id]) @@id([businessId, categoryId]) }

// ---------- Events ----------
model Program {                        // signature program (Community Cleanup, Art Fair, ...)
  id String @id @default(cuid()) slug String @unique name String description String? heroUrl String? isActive Boolean @default(true) events Event[]
}
model Event {
  id           String   @id @default(cuid())
  slug         String   @unique
  title        String
  summary      String?
  description  String?
  programId    String?
  program      Program? @relation(fields:[programId], references:[id])
  startAt      DateTime
  endAt        DateTime?
  timezone     String   @default("America/Los_Angeles")
  locationName String?
  address      String?
  lat          Float?
  lng          Float?
  coverUrl     String?
  capacity     Int?
  isMembersOnly Boolean @default(false)
  status       EventStatus @default(DRAFT)
  recurrenceRule String?               // iCal RRULE for recurring
  ticketTypes  TicketType[]
  registrations EventRegistration[]
  sponsors     EventSponsor[]
  photos       MediaAsset[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  @@index([status, startAt])
}
enum EventStatus { DRAFT PUBLISHED CANCELLED COMPLETED }

model TicketType {
  id        String @id @default(cuid())
  eventId   String
  event     Event  @relation(fields:[eventId], references:[id])
  name      String                     // General, Member, Sponsor, VIP
  priceCents Int   @default(0)         // 0 = free RSVP
  quantity  Int?                       // null = unlimited
  memberOnly Boolean @default(false)
  salesEndAt DateTime?
  registrations EventRegistration[]
}

model EventRegistration {
  id           String @id @default(cuid())
  eventId      String
  event        Event  @relation(fields:[eventId], references:[id])
  ticketTypeId String?
  ticketType   TicketType? @relation(fields:[ticketTypeId], references:[id])
  userId       String?
  user         User?  @relation(fields:[userId], references:[id])
  guestName    String?                 // non-user RSVP
  guestEmail   String?
  quantity     Int    @default(1)
  status       RegistrationStatus @default(CONFIRMED)
  checkedInAt  DateTime?
  invoiceId    String?
  invoice      Invoice? @relation(fields:[invoiceId], references:[id])
  createdAt    DateTime @default(now())
  @@index([eventId, status])
}
enum RegistrationStatus { CONFIRMED WAITLISTED CANCELLED ATTENDED NO_SHOW }

// ---------- Sponsors & Donations ----------
model Sponsor      { id String @id @default(cuid()) name String logoUrl String? website String? tier SponsorTier @default(BRONZE) businessId String? events EventSponsor[] sponsorships Sponsorship[] }
enum SponsorTier { BRONZE SILVER GOLD PLATINUM TITLE }
model EventSponsor { eventId String sponsorId String event Event @relation(fields:[eventId],references:[id]) sponsor Sponsor @relation(fields:[sponsorId],references:[id]) @@id([eventId, sponsorId]) }
model Sponsorship  { id String @id @default(cuid()) sponsorId String businessId String? amountCents Int status String sponsor Sponsor @relation(fields:[sponsorId],references:[id]) business Business? @relation(fields:[businessId],references:[id]) createdAt DateTime @default(now()) }
model Donation     { id String @id @default(cuid()) userId String? user User? @relation(fields:[userId],references:[id]) donorName String? donorEmail String? amountCents Int isRecurring Boolean @default(false) stripePaymentId String? message String? createdAt DateTime @default(now()) @@index([createdAt]) }

// ---------- Billing ----------
model Invoice {
  id            String @id @default(cuid())
  number        String @unique
  userId        String
  user          User   @relation(fields:[userId], references:[id])
  membershipId  String?
  membership    Membership? @relation(fields:[membershipId], references:[id])
  amountCents   Int
  currency      String @default("usd")
  status        InvoiceStatus @default(OPEN)
  stripeInvoiceId String?
  dueAt         DateTime?
  paidAt        DateTime?
  pdfUrl        String?
  payments      Payment[]
  registrations EventRegistration[]
  lineItems     Json
  createdAt     DateTime @default(now())
  @@index([userId, status])
}
enum InvoiceStatus { DRAFT OPEN PAID VOID UNCOLLECTIBLE REFUNDED }

model Payment {
  id            String @id @default(cuid())
  invoiceId     String?
  invoice       Invoice? @relation(fields:[invoiceId], references:[id])
  amountCents   Int
  currency      String @default("usd")
  method        String                  // card, ach
  status        PaymentStatus
  stripePaymentIntentId String? @unique
  receiptUrl    String?
  createdAt     DateTime @default(now())
}
enum PaymentStatus { PENDING SUCCEEDED FAILED REFUNDED }

// ---------- Content ----------
model Article          { id String @id @default(cuid()) slug String @unique title String excerpt String? body String? coverUrl String? type ArticleType @default(SPOTLIGHT) status ContentStatus @default(DRAFT) publishedAt DateTime? authorId String? createdAt DateTime @default(now()) @@index([type, status, publishedAt]) }
enum ArticleType { SPOTLIGHT NEWS PRESS }
enum ContentStatus { DRAFT PENDING PUBLISHED ARCHIVED }
model Announcement     { id String @id @default(cuid()) businessId String? business Business? @relation(fields:[businessId],references:[id]) title String body String status ContentStatus @default(PENDING) publishedAt DateTime? createdAt DateTime @default(now()) }
model BoardMember      { id String @id @default(cuid()) name String role String company String? email String? photoUrl String? group BoardGroup @default(DIRECTOR) sortOrder Int @default(0) }
enum BoardGroup { EXECUTIVE DIRECTOR HONORARY ADMIN_STAFF }
model Faq              { id String @id @default(cuid()) question String answer String category String? sortOrder Int @default(0) isPublished Boolean @default(true) }
model Page             { id String @id @default(cuid()) slug String @unique title String body String seoTitle String? seoDescription String? updatedAt DateTime @updatedAt }   // privacy, terms, etc.

// ---------- Engagement ----------
model NewsletterSubscriber { id String @id @default(cuid()) email String @unique name String? status SubStatus @default(PENDING) source String? confirmedAt DateTime? createdAt DateTime @default(now()) }
enum SubStatus { PENDING CONFIRMED UNSUBSCRIBED }
model ContactSubmission    { id String @id @default(cuid()) firstName String? lastName String? email String phone String? interest String? message String handled Boolean @default(false) createdAt DateTime @default(now()) @@index([handled, createdAt]) }
model SavedSearch         { id String @id @default(cuid()) userId String user User @relation(fields:[userId],references:[id]) name String query Json createdAt DateTime @default(now()) }

// ---------- Media ----------
model MediaAsset {
  id         String @id @default(cuid())
  url        String
  type       MediaType
  alt        String?
  width      Int?
  height     Int?
  sizeBytes  Int?
  businessId String?
  business   Business? @relation(fields:[businessId], references:[id])
  eventId    String?
  event      Event?    @relation(fields:[eventId], references:[id])
  uploadedById String?
  createdAt  DateTime @default(now())
}
enum MediaType { IMAGE LOGO COVER DOCUMENT VIDEO }

// ---------- AI ----------
model AiUsageLog {
  id          String @id @default(cuid())
  userId      String?
  user        User?  @relation(fields:[userId], references:[id])
  feature     String                    // faq_assistant, write_description, admin_newsletter...
  model       String
  inputTokens Int
  outputTokens Int
  costCents   Int?
  status      String                    // ok, error, blocked
  latencyMs   Int?
  createdAt   DateTime @default(now())
  @@index([feature, createdAt])
  @@index([userId, createdAt])
}
model AiDraft {                          // generated content awaiting approval
  id        String @id @default(cuid())
  feature   String
  authorId  String?
  targetType String?                     // article, announcement, newsletter...
  targetId  String?
  content   Json
  status    AiDraftStatus @default(PENDING)
  reviewedById String?
  createdAt DateTime @default(now())
}
enum AiDraftStatus { PENDING APPROVED REJECTED PUBLISHED }

// ---------- Notifications & Settings ----------
model Notification {
  id        String @id @default(cuid())
  userId    String
  user      User   @relation(fields:[userId], references:[id])
  type      String                       // membership.expiring, event.reminder...
  title     String
  body      String?
  link      String?
  channel   NotifChannel @default(IN_APP)
  readAt    DateTime?
  createdAt DateTime @default(now())
  @@index([userId, readAt])
}
enum NotifChannel { IN_APP EMAIL BOTH }
model Setting  { key String @id value Json updatedAt DateTime @updatedAt }   // singletons: site config, AI controls, feature flags
model AuditLog { id String @id @default(cuid()) actorId String? action String entity String entityId String? meta Json? createdAt DateTime @default(now()) @@index([entity, entityId]) @@index([actorId, createdAt]) }
```

## Indexing & performance notes

- Directory search: GIN full-text index on `Business(name, description, tagline)` +
  filters on `status`, `tier`, category join.
- Events: composite index `(status, startAt)` for upcoming queries.
- Memberships: `(status, expiresAt)` powers renewal-reminder jobs.
- All foreign keys indexed; pagination via keyset (cursor) on large lists.

## Seed data (from Phase 1)

- 5 `MembershipPlan` rows ($50–$300).
- 14 `Category` rows (the industries).
- 7 `Program` rows (signature programs).
- ~18 `BoardMember` rows (current roster).
- 7 `Faq` rows.
- 2 `Page` rows (privacy, terms).
- 120 `Business` rows + owners — migrated from Wix export (client to provide).

## Migration mapping (Wix → new DB)

| Wix source | Target table(s) |
|------------|-----------------|
| Members collection (120) | Business + BusinessMember + BusinessCategory + Membership |
| Pricing Plans (5) | MembershipPlan |
| Wix Events | Event + TicketType + EventRegistration |
| Site search categories (14) | Category |
| Board page roster | BoardMember |
| FAQ page | Faq |
| Spotlight post | Article |
| Privacy/Terms | Page |
| Contact/newsletter submissions | ContactSubmission / NewsletterSubscriber |
