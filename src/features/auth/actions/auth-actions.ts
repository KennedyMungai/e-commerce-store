"use server";

import { signIn, signOut } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { sendPasswordResetMail, sendVerificationMail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/password-reset-token-queries";
import { actionClient } from "@/lib/safe-action";
import { findUserByEmail } from "@/lib/user-queries";
import {
  ForgotPasswordSchema,
  PasswordResetSchema,
  SigninSchema,
  SignupSchema,
} from "@/lib/validation";
import { createVerificationToken } from "@/lib/verification-queries";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export const credentialsSigninAction = actionClient
  .schema(SigninSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const existingUser = await findUserByEmail(email);

    if (!existingUser) throw new Error("Sign in failed");

    if (!existingUser.password) throw new Error("Sign in failed");

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordValid) throw new Error("Sign in failed");

    await signIn("credentials", { email, password });
  });

export const credentialsSignupAction = actionClient
  .schema(SignupSchema)
  .action(
    async ({ parsedInput: { name, email, password, confirmPassword } }) => {
      if (password !== confirmPassword)
        throw new Error("Passwords do not match");

      const existingUser = await findUserByEmail(email);

      if (existingUser) throw new Error("User signup failed");

      const hashedPassword = await bcrypt.hash(password, 10);

      const [user] = await db
        .insert(users)
        .values({
          name,
          email,
          password: hashedPassword,
        })
        .returning();

      if (!user) throw new Error("User signup failed");

      const verificationToken = await createVerificationToken(email);

      await sendVerificationMail(
        verificationToken.identifier,
        verificationToken.token,
      );
    },
  );

export const signoutAction = actionClient.action(async () => {
  await signOut();
});

export const googleAuthAction = async () => await signIn("google");

export const githubAuthAction = async () => await signIn("github");

export const forgotPasswordAction = actionClient
  .schema(ForgotPasswordSchema)
  .action(async ({ parsedInput: { email } }) => {
    const existingUser = await findUserByEmail(email);

    if (!existingUser) throw new Error("Password reset failed");

    const resetToken = await generatePasswordResetToken(existingUser.email!);

    await sendPasswordResetMail(resetToken.email, resetToken.token);
  });

export const passwordResetAction = actionClient
  .schema(PasswordResetSchema)
  .action(async ({ parsedInput: { email, password, confirmPassword } }) => {
    if (password !== confirmPassword) throw new Error("Passwords do not match");

    const [updatedUser] = await db
      .update(users)
      .set({ password })
      .where(eq(users.email, email))
      .returning();

    if (!updatedUser) throw new Error("Password reset failed");
  });