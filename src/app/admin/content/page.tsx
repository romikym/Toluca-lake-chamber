import { ContentManager } from "@/components/admin/content-manager";
import { adminContent } from "@/server/admin";

export const dynamic = "force-dynamic";

export default async function AdminContent() {
  const { articles, submissions } = await adminContent();
  return (
    <ContentManager
      articles={articles.map((a) => ({
        slug: a.slug, title: a.title, excerpt: a.excerpt, date: a.date.toISOString(),
        type: a.type, status: a.status, hue: a.hue,
      }))}
      submissions={submissions.map((s) => ({
        id: s.id,
        name: [s.firstName, s.lastName].filter(Boolean).join(" ") || s.email,
        interest: s.interest ?? "General",
        date: s.createdAt.toISOString(),
        handled: s.handled,
      }))}
    />
  );
}
