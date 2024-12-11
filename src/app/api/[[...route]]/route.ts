import authConfig from "@/auth.config";
import { categories } from "@/features/categories/server/categories";
import { comments } from "@/features/comments/server/comments";
import { orderItems } from "@/features/orderItems/server/order-items";
import { orders } from "@/features/orders/server/orders";
import { productRating } from "@/features/productRating/server/product-rating";
import { products } from "@/features/products/server/products";
import { suppliers } from "@/features/suppliers/server/suppliers";
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
  .route("/products", products)
  .route("/suppliers", suppliers)
  .route("/orders", orders)
  .route("/orderItems", orderItems)
  .route("/comments", comments)
  .route("/productRating", productRating);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof app;
