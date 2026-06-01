import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe auth config (no Prisma / bcrypt). Used by middleware for route
 * protection. The full config in auth.ts adds the Credentials provider.
 */
export const authConfig = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const user = auth?.user as { role?: string } | undefined;

      if (pathname.startsWith("/admin")) {
        return user?.role === "ADMIN" || user?.role === "STAFF";
      }
      if (pathname.startsWith("/portal")) {
        return !!user;
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.uid = (user as { id?: string }).id;
        token.role = (user as { role?: string }).role;
        token.businessSlug = (user as { businessSlug?: string | null }).businessSlug ?? null;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.uid as string;
        (session.user as { role?: string }).role = token.role as string;
        (session.user as { businessSlug?: string | null }).businessSlug =
          (token.businessSlug as string | null) ?? null;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
