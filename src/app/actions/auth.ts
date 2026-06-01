"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { db } from "@/lib/db";

export async function authenticate(
  _prev: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  try {
    await signIn("credentials", {
      email,
      password: formData.get("password"),
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) return "Invalid email or password.";
    throw error;
  }
  // Read role from the DB — auth() can't see the just-set cookie in this same request.
  const user = await db.user.findUnique({ where: { email }, select: { role: true } });
  redirect(user?.role === "ADMIN" || user?.role === "STAFF" ? "/admin" : "/portal");
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
