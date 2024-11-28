import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationMail = async (email: string, token: string) => {
  const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/signup/verify-email?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${verificationLink}">here</a> to verify your email</p>`,
  });
};

export const sendPasswordResetMail = async (email: string, token: string) => {
  const passwordResetLink = `${process.env.NEXT_PUBLIC_APP_URL}/signin/password-reset?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${passwordResetLink}">here</a> to reset your password</p>`,
  });
};