import "server-only";

import { db } from "@/db";
import { PasswordResetToken } from "@/db/schema";
import { VERIFICATION_TOKEN_EXPIRATION_IN_MINUTES } from "@/lib/constants";
import { eq } from "drizzle-orm";

export const generatePasswordResetToken = async (email: string) => {
  const existingToken = await db
    .select()
    .from(PasswordResetToken)
    .where(eq(PasswordResetToken.email, email))
    .then((res) => res[0]);

  if (existingToken)
    await db
      .delete(PasswordResetToken)
      .where(eq(PasswordResetToken.email, email));

  const expires = new Date(
    Date.now() + VERIFICATION_TOKEN_EXPIRATION_IN_MINUTES * 60 * 1000,
  );

  const token = Math.random().toString(36).substring(2, 9);

  const [newResetToken] = await db
    .insert(PasswordResetToken)
    .values({
      email,
      token,
      expires,
    })
    .returning();

  return newResetToken;
};

export const getPasswordResetTokenByToken = async (token: string) =>
  await db
    .select()
    .from(PasswordResetToken)
    .where(eq(PasswordResetToken.token, token))
    .then((res) => res[0]);
