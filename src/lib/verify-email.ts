import "server-only";

import { db } from "@/db";
import { users, verificationTokens } from "@/db/schema";
import { getVerificationTokenByToken } from "@/lib/verification-queries";
import { eq } from "drizzle-orm";

export const verifyEmail = async (token: string) => {
  const verificationToken = await getVerificationTokenByToken(token);

  if (!verificationToken || verificationToken.expires < new Date())
    return false;

  await db
    .delete(verificationTokens)
    .where(eq(verificationTokens.token, token));

  await db
    .update(users)
    .set({ emailVerified: new Date() })
    .where(eq(users.email, verificationToken.identifier));

  return true;
};
