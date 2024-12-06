import { Hono } from "hono";
import { handle } from "hono/vercel";
import categories from "@/features/categories/server/categories";
import { AuthConfig } from "@auth/core";
import authConfig from "@/auth.config";
import { initAuthConfig } from "@hono/auth-js";

export const runtime = "nodejs";

const getAuthConfig = (): AuthConfig => {
  // FIXME: Find a way to fix the type error.
  // @ts-expect-error Type error.
  return {
    secret: process.env.AUTH_SECRET!,
    ...authConfig,
  };
};

const app = new Hono()
  .basePath("/api")
  .use("*", initAuthConfig(getAuthConfig))
  .route("/categories", categories);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof app;
