import { db } from "@/db";
import { Comment, InsertCommentSchema } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

export const comments = new Hono()
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
        .from(Comment)
        .where(eq(Comment.product_id, productId));

      return c.json({ data });
    },
  )
  .post(
    "/:productId",
    verifyAuth(),
    zValidator("param", z.object({ productId: z.string() })),
    zValidator("json", InsertCommentSchema),
    async (c) => {
      const auth = c.get("authUser");
      const { productId } = c.req.valid("param");
      const commentData = await c.req.valid("json");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const [data] = await db
        .insert(Comment)
        .values({
          ...commentData,
          user_id: auth.token.id as string,
          product_id: productId,
        })
        .returning();

      if (!data) return c.json({ error: "Failed to create the comment" }, 400);

      return c.json({ data });
    },
  )
  .patch(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", InsertCommentSchema),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");
      const commentData = c.req.valid("json");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const [data] = await db
        .update(Comment)
        .set(commentData)
        .where(
          and(eq(Comment.id, id), eq(Comment.user_id, auth.token.id as string)),
        )
        .returning();

      if (!data) return c.json({ error: "Failed to update the comment" }, 400);

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
        .delete(Comment)
        .where(eq(Comment.id, id))
        .returning();

      if (!data) return c.json({ error: "Failed to delete the comment" }, 400);

      return c.json({ data });
    },
  );
