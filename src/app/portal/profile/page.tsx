import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ProfileForm } from "@/components/portal/profile-form";

export const dynamic = "force-dynamic";

export default async function PortalProfilePage() {
  const session = await auth();
  const uid = (session?.user as { id?: string } | undefined)?.id;
  const user = uid
    ? await db.user.findUnique({ where: { id: uid }, include: { business: true } })
    : null;

  return (
    <ProfileForm
      name={user?.name ?? ""}
      email={user?.email ?? (session?.user?.email ?? "")}
      organization={user?.business?.name ?? ""}
    />
  );
}
