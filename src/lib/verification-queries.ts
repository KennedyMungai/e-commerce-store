import "server-only";

import { db } from "@/db";
import { verificationTokens } from "@/db/schema";
import { VERIFICATION_TOKEN_EXPIRATION_IN_MINUTES } from "@/lib/constants";
import { eq } from "drizzle-orm";

export const getVerificationTokenByEmail = async (email: string) =>
  await db
    .select()
    .from(verificationTokens)
    .where(eq(verificationTokens.identifier, email))
    .then((res) => res[0]);

export const getVerificationTokenByToken = async (token: string) =>
  await db
    .select()
    .from(verificationTokens)
    .where(eq(verificationTokens.token, token))
    .then((res) => res[0]);

export const createVerificationToken = async (email: string) => {
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken)
    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.identifier, email));

  const expires = new Date(
    Date.now() + VERIFICATION_TOKEN_EXPIRATION_IN_MINUTES * 60 * 1000,
  );

  const token = Math.random().toString(36).substring(2, 9);

  const [newVerificationToken] = await db
    .insert(verificationTokens)
    .values({
      identifier: email,
      token,
      expires,
    })
    .returning();

  return newVerificationToken;
};
