import "server-only";
import { getPasswordResetTokenByToken } from "@/lib/password-reset-token-queries";
import { db } from "@/db";
import { PasswordResetToken, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const verifyResetEmail = async (token: string) => {
  const resetToken = await getPasswordResetTokenByToken(token);

  if (!resetToken || resetToken.expires < new Date()) return false;

  await db
    .delete(PasswordResetToken)
    .where(eq(PasswordResetToken.token, token));

  await db
    .update(users)
    .set({
      emailVerified: new Date(),
    })
    .where(eq(users.email, resetToken.email));

  return true;
};
