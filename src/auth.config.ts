import { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { SigninSchema } from "@/lib/validation";
import { findUserByEmail } from "@/lib/user-queries";
import bcrypt from "bcryptjs";

export default {
  providers: [
    GitHub,
    Google,
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = SigninSchema.parse(credentials);

        const { email, password } = parsedCredentials;

        const existingUser = await findUserByEmail(email);

        if (!existingUser || !existingUser.password) return null;

        const isPasswordValid = await bcrypt.compare(
          password,
          existingUser.password,
        );

        if (isPasswordValid) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password: _, ...user } = existingUser;

          return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
