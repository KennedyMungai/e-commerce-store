import authConfig from "@/auth.config";
import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  pages: { signIn: "/signin", signOut: "/" },
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      if (user?.role) token.role = user.role;

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as "user" | "admin" | "superadmin";

      return session;
    },
    signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      if (account?.provider) {
        if (user?.emailVerified) return true;
      }

      return false;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
