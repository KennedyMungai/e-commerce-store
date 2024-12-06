import authConfig from "@/auth.config";
import { categories } from "@/features/categories/server/categories";
import { products } from "@/features/products/server/products";
import { AuthConfig } from "@auth/core";
import { initAuthConfig } from "@hono/auth-js";
import { Hono } from "hono";
import { handle } from "hono/vercel";

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
  .route("/categories", categories)
  .route("/products", products);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof app;
