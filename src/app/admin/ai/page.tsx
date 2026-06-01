import { AiStudioView } from "@/components/admin/ai-studio-view";
import { aiStats, getAiDrafts } from "@/server/admin";

export default async function AdminAiStudio() {
  const [stats, draftRows] = await Promise.all([aiStats(), getAiDrafts()]);
  const drafts = draftRows.map((d) => ({
    id: d.id, feature: d.feature, title: d.title, content: d.content,
    status: d.status, author: d.author, createdAt: d.createdAt.toISOString(),
  }));
  return <AiStudioView stats={stats} drafts={drafts} />;
}
