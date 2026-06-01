# 05 — Authentication & Permissions

## Authentication (Auth.js / NextAuth v5)

### Methods
| Method | Use |
|--------|-----|
| **Email + password** | Primary member/admin login (Wix parity) |
| **Magic link (email)** | Passwordless option + password reset |
| **OAuth (Google)** | Optional faster sign-in |
| **JWT issuance** | For the future mobile app (REST bearer tokens) |

> Per safety policy, account creation and password entry are always performed by the
> user themselves; the platform never creates accounts or stores raw passwords
> (Argon2/bcrypt hashes only).

### Session model
- Web: secure, httpOnly, SameSite cookies (database sessions for revocation).
- Mobile/REST: short-lived **access JWT** + rotating **refresh token**.
- Session carries `userId`, `roles`, and `businessIds` (memberships) for fast guards.

### Flows
1. **Sign up** → create `User` (status `PENDING` until email verified) → assign
   `SUBSCRIBER`/`MEMBER_OWNER` role on membership purchase/approval.
2. **Join the Chamber** → signup → choose plan → Stripe checkout → membership
   `PENDING` → admin approval → `ACTIVE` + portal access.
3. **Login** → credential/magic-link → session.
4. **Reset** → request → emailed link → set new password (user-entered).
5. **Team invite** → owner invites email → invitee signs up → linked as
   `BusinessMember` with chosen `BusinessRole`.

## Authorization — RBAC

Two complementary layers:

### 1. Global roles (`RoleKey`)
| Role | Scope |
|------|-------|
| `SUPER_ADMIN` | Everything incl. settings, roles, billing config |
| `ADMIN` | Full chamber operations (members, events, content, payments) |
| `STAFF` | Day-to-day ops, limited destructive actions |
| `BOARD` | Read dashboards/reports, approvals |
| `MEMBER_OWNER` | Owns a business listing + billing |
| `MEMBER_TEAM` | Works on a business listing (no billing) |
| `SUBSCRIBER` | Newsletter/account only, no membership |

### 2. Resource roles (`BusinessRole`) — per business
`OWNER > MANAGER > EDITOR > VIEWER` control who can edit a specific listing, manage
team, submit events/announcements, or just view.

### Permission model
Fine-grained `Permission` keys grouped by domain, mapped to roles via
`RolePermission`. Checked in services with `assertPermission(user, action, resource)`.

```
member.profile.read/update
business.listing.read/update/publish
business.team.manage
event.read / event.register / event.submit
event.manage / event.checkin            (admin/staff)
membership.renew / membership.upgrade
billing.invoice.read (own) / billing.manage (admin)
announcement.submit / announcement.approve
ai.use.member / ai.use.admin / ai.approve
admin.members.manage / admin.users.manage / admin.roles.manage
admin.content.manage / admin.reports.read
settings.manage                          (super admin)
```

### Permission matrix (excerpt)

| Action | SUPER | ADMIN | STAFF | BOARD | OWNER | TEAM | SUB |
|--------|:----:|:----:|:----:|:----:|:----:|:----:|:---:|
| View public site | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Edit own business listing | ✓ | ✓ | – | – | ✓ | ✓* | – |
| Manage business team/billing | ✓ | ✓ | – | – | ✓ | – | – |
| Register for events | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Submit event/announcement | ✓ | ✓ | ✓ | – | ✓ | ✓* | – |
| Approve submissions | ✓ | ✓ | ✓ | – | – | – | – |
| Manage all members/events | ✓ | ✓ | ✓ | – | – | – | – |
| View reports/analytics | ✓ | ✓ | ✓ | ✓ | own | – | – |
| Process refunds | ✓ | ✓ | – | – | – | – | – |
| Manage users & roles | ✓ | ✓ | – | – | – | – | – |
| Manage site settings / AI controls | ✓ | – | – | – | – | – | – |
| Use member AI tools | ✓ | ✓ | ✓ | – | ✓ | ✓* | – |
| Use admin AI tools | ✓ | ✓ | ✓ | – | – | – | – |

`*` = subject to that team member's `BusinessRole` (EDITOR+ for edits/submits).

## Enforcement layers (defense in depth)
1. **Route/layout guards** — `portal/*` requires session; `admin/*` requires
   ADMIN/STAFF/BOARD; redirect otherwise.
2. **tRPC/REST procedure guards** — `protectedProcedure`, `adminProcedure`,
   `memberProcedure`, resource-ownership checks.
3. **Service-level `assertPermission`** — the real gate (UI/route guards are UX only).
4. **DB constraints** — ownership via `BusinessMember`; queries always scoped to the
   caller's allowed resources.

## Security practices
- Rate limit auth endpoints (login, reset, magic link) per IP + per account.
- Generic auth error messages (no user enumeration).
- Email verification required before sensitive actions.
- Audit log for role changes, approvals, refunds, deletions.
- Re-authentication step for high-risk actions (role grant, refund, account deletion).
- Sessions revocable from DB; refresh-token rotation for mobile.
