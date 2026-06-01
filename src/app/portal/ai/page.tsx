"use client";

import { AiGenerator, type AiTool } from "@/components/ai/ai-generator";

const tools: AiTool[] = [
  { key: "desc", label: "Business description", desc: "A polished directory description.", placeholder: "Tell us about your business — what you do, who you serve, what makes you special…", build: (i) => `Write a warm, professional business directory description (about 60 words) for a Toluca Lake Chamber member based on these notes: ${i}` },
  { key: "seo", label: "SEO improvements", desc: "Optimize your listing for search.", placeholder: "Paste your current description or business details…", build: (i) => `Suggest SEO improvements and a meta description for this local business listing: ${i}` },
  { key: "social", label: "Social post", desc: "Ready-to-post caption.", placeholder: "What do you want to announce or promote?", build: (i) => `Write an upbeat Instagram caption with a few relevant hashtags for a Toluca Lake business about: ${i}` },
  { key: "announce", label: "Announcement", desc: "Share news with the community.", placeholder: "What's the announcement?", build: (i) => `Write a short, friendly community announcement for the Toluca Lake Chamber about: ${i}` },
  { key: "press", label: "Press release", desc: "Professional press release.", placeholder: "Key details: who, what, when, where, why…", build: (i) => `Write a concise local press release for a Toluca Lake business about: ${i}` },
];

export default function PortalAiPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-brand-900">AI Tools</h1>
        <p className="text-sm text-muted">Create marketing content for your business with Claude — drafts you can edit and use.</p>
      </div>
      <AiGenerator tools={tools} />
    </div>
  );
}
