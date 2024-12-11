import { db } from "@/db";
import { InsertProductRatingSchema, ProductRating } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

export const productRating = new Hono()
  .get(
    "/:productId",
    verifyAuth(),
    zValidator("param", z.object({ productId: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const { productId } = c.req.valid("param");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const data = await db
        .select()
        .from(ProductRating)
        .where(eq(ProductRating.product_id, productId));

      return c.json(data);
    },
  )
  .post(
    "/:productId",
    verifyAuth(),
    zValidator("param", z.object({ productId: z.string() })),
    zValidator("json", InsertProductRatingSchema),
    async (c) => {
      const auth = c.get("authUser");
      const { productId } = c.req.valid("param");
      const productRating = c.req.valid("json");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const [data] = await db
        .insert(ProductRating)
        .values({
          ...productRating,
          user_id: auth.token.id as string,
          product_id: productId,
        })
        .returning();

      if (!data) return c.json({ error: "Failed to rate the product" }, 400);

      return c.json({ data });
    },
  )
  .patch(
    "/:productId",
    verifyAuth(),
    zValidator("param", z.object({ productId: z.string() })),
    zValidator("json", z.object({ rating: z.number() })),
    async (c) => {
      const auth = c.get("authUser");
      const { productId } = c.req.valid("param");
      const { rating } = c.req.valid("json");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const [data] = await db
        .update(ProductRating)
        .set({ rating })
        .where(
          and(
            eq(ProductRating.product_id, productId),
            eq(ProductRating.user_id, auth.token.id as string),
          ),
        )
        .returning();

      if (!data) return c.json({ error: "Failed to update the rating" }, 400);

      return c.json({ data });
    },
  );
