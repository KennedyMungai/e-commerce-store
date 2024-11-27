import { z } from "zod";

export const SigninSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must be at least 8 characters long and contain at least one letter and one number",
    ),
});

export type SigninType = z.infer<typeof SigninSchema>;

export const SignupSchema = SigninSchema.extend({
  name: z.string().min(1, "Name is required"),
  confirmPassword: z
    .string()
    .min(1, "Confirm Password is required")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must be at least 8 characters long and contain at least one letter and one number",
    ),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SignupType = z.infer<typeof SignupSchema>;

export const ForgotPasswordSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
});

export type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>;

export const PasswordResetSchema = z
  .object({
    email: z.string().email().min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must be at least 8 characters long and contain at least one letter and one number",
      ),
    confirmPassword: z
      .string()
      .min(1, "Confirm Password is required")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must be at least 8 characters long and contain at least one letter and one number",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type PasswordResetType = z.infer<typeof PasswordResetSchema>;
