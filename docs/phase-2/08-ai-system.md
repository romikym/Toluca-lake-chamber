# 08 — AI System (Claude-powered)

## Principles
- **Server-only**: all Claude calls go through one service in `packages/ai`. The
  `ANTHROPIC_API_KEY` never reaches the browser or mobile bundle.
- **Governed**: every call is templated, logged, rate-limited, budgeted, and
  permission-checked. Generated content that publishes goes through **approval**.
- **Swappable model tier**: default model in env; per-feature override.

## Architecture

```
Client (chat / generate button)
      │  tRPC ai.* / REST /v1/ai/*
      ▼
AI Service (packages/ai)
   ├─ permission check (ai.use.member / ai.use.admin)
   ├─ rate limit + budget guard (Redis + AiUsageLog)
   ├─ prompt template (versioned) + context assembly (RAG)
   ├─ Anthropic SDK call (stream)  ──▶  Claude API
   ├─ log usage (tokens, cost, latency, status) → AiUsageLog
   └─ if publishable → create AiDraft (PENDING approval)
```

## Prompt templates (`packages/ai/prompts`)
Versioned, typed templates with input Zod schemas. Each feature = one template +
system prompt + output contract. Examples:
`faqAssistant`, `businessDiscovery`, `eventRecommender`, `writeBusinessDescription`,
`improveSeo`, `writeAnnouncement`, `socialPost`, `pressRelease`, `newsletterDraft`,
`memberSpotlight`, `sponsorProposal`, `summarizeForm`, `membershipTrends`,
`inactiveMemberStrategy`.

## Context / RAG
- Tool/context providers pull **only authorized, relevant** data: directory listings,
  events, FAQs, the member's own business, program info.
- Public assistants are scoped to public content; member/admin tools to the caller's
  permitted data. No cross-tenant leakage.

## Feature catalog

### Public assistants (site-wide)
| Feature | Does |
|---------|------|
| Chamber Assistant | Answers about the chamber, joining, navigation |
| FAQ Assistant | Conversational FAQ over the 7+ Q&As |
| Community Guide | Recommends places/programs in Toluca Lake |
| Business Discovery | Natural-language directory search ("family-friendly dentist") |
| Event Recommendations | Suggests events by interest |
| Support Assistant | Triages help, routes to contact/admin |

### Member AI tools (portal)
Write/improve: business description · SEO · event listings · announcements · social
posts · newsletters · press releases · sponsorship requests · profile · marketing copy.
→ Output lands in the relevant editor as a draft the member edits/accepts.

### Admin AI tools (dashboard)
Generate: newsletters · event content · member spotlights · sponsor proposals · press
releases. Analyze: summarize form submissions · generate reports · membership-trend
analysis · identify inactive members · recommend engagement strategies · social content.
→ Publishable outputs become `AiDraft` (PENDING) requiring approval before going live.

## Governance & controls (admin)
- **Usage tracking/logging**: `AiUsageLog` (per user, feature, tokens, cost, latency).
- **Rate limiting**: per-user and per-feature (Redis sliding window).
- **Budget**: monthly cap (`AI_MONTHLY_BUDGET`); soft warn → hard stop; per-feature
  caps; admin dashboard of spend.
- **Approval workflow**: `AiDraft` review queue (approve/reject/edit) for anything
  that publishes (newsletters, spotlights, announcements, press releases).
- **Controls**: enable/disable features, choose model tier, edit prompt templates,
  set caps — all in `admin/ai` (stored in `Setting`).
- **Safety**: outputs reviewed before public publish; no PII compiled across members;
  prompt-injection-resistant system prompts; user content treated as data.

## Streaming UX
- Chat + generation stream tokens (SSE) for responsiveness.
- AIChatPanel (public) and AIGeneratorModal (portal/admin) components.

## Future expansion
- Tool-use/function-calling to take actions (draft an event, prefill a listing).
- Embeddings + vector search for smarter discovery.
- Scheduled AI digests/reports.
- Mobile assistant reuses the same REST endpoints.

## Services (services/ai.ts)
`runAssistant(feature, input, user)`, `generateDraft(...)`, `assertAiBudget(user)`,
`logAiUsage(...)`, `listAiDrafts`, `approveAiDraft`.
