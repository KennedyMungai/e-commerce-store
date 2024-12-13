import { db } from "@/db";
import { InsertWishListSchema, WishList } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

export const wishlists = new Hono()
  .get("/", verifyAuth(), async (c) => {
    const auth = c.get("authUser");

    if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

    const data = await db
      .select()
      .from(WishList)
      .where(eq(WishList.user_id, auth.token?.id as string));

    return c.json({ data });
  })
  .get(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const [data] = await db
        .select()
        .from(WishList)
        .where(
          and(
            eq(WishList.user_id, auth.token?.id as string),
            eq(WishList.id, id),
          ),
        );

      if (!data) return c.json({ error: "Wishlist not found" }, 404);

      return c.json({ data });
    },
  )
  .post(
    "/",
    verifyAuth(),
    zValidator("json", InsertWishListSchema),
    async (c) => {
      const auth = c.get("authUser");
      const { product_id } = c.req.valid("json");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const [data] = await db
        .insert(WishList)
        .values({
          product_id,
          user_id: auth.token.id as string,
        })
        .returning();

      if (!data) return c.json({ error: "Failed to create wishlist" }, 400);

      return c.json({ data });
    },
  )
  .patch(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", InsertWishListSchema),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");
      const { product_id } = c.req.valid("json");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const [data] = await db
        .update(WishList)
        .set({ product_id })
        .where(
          and(
            eq(WishList.user_id, auth.token?.id as string),
            eq(WishList.id, id),
          ),
        )
        .returning();

      if (!data) return c.json({ error: "Failed to update wishlist" }, 400);

      return c.json({ data });
    },
  )
  .delete(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const [data] = await db
        .delete(WishList)
        .where(
          and(
            eq(WishList.user_id, auth.token?.id as string),
            eq(WishList.id, id),
          ),
        )
        .returning();

      if (!data) return c.json({ error: "Failed to delete wishlist" }, 400);

      return c.json({ data });
    },
  );
