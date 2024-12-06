import { db } from "@/db";
import { Category, InsertCategorySchema } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

export const categories = new Hono()
  .get("/", verifyAuth(), async (c) => {
    const auth = c.get("authUser");

    if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

    const data = await db.select().from(Category);

    return c.json({
      data,
    });
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
        .from(Category)
        .where(eq(Category.id, id));

      if (!data) return c.json({ error: "Category not found" }, 404);

      return c.json({ data });
    },
  )
  .post(
    "/",
    verifyAuth(),
    zValidator("json", InsertCategorySchema),
    async (c) => {
      const auth = c.get("authUser");

      const { name, description } = c.req.valid("json");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const [data] = await db
        .insert(Category)
        .values({
          name,
          description,
        })
        .returning();

      return c.json({ data });
    },
  )
  .patch(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", InsertCategorySchema),
    async (c) => {
      const auth = c.get("authUser");

      const { id } = c.req.valid("param");
      const { name, description } = c.req.valid("json");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const [data] = await db
        .update(Category)
        .set({ name, description })
        .where(eq(Category.id, id))
        .returning();

      if (!data) return c.json({ error: "Category not found" }, 404);

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
        .delete(Category)
        .where(eq(Category.id, id))
        .returning();

      if (!data) return c.json({ error: "Category not found" }, 404);

      return c.json({ data });
    },
  );

