import { db } from "@/db";
import { PasswordResetToken } from "@/db/schema";
import { eq } from "drizzle-orm";
import "server-only";

export const getPasswordResetTokenByToken = async (token: string) =>
  await db
    .select()
    .from(PasswordResetToken)
    .where(eq(PasswordResetToken.token, token))
    .then((res) => res[0]);
