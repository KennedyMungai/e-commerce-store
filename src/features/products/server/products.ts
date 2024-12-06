import { db } from "@/db";
import { InsertProductSchema, Product } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

export const products = new Hono()
  .get(
    "/:categoryId",
    verifyAuth(),
    zValidator("param", z.object({ categoryId: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const { categoryId } = c.req.valid("param");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const data = await db
        .select()
        .from(Product)
        .where(eq(Product.category_id, categoryId));

      return c.json({ data });
    },
  )
  .get(
    "/:productId",
    verifyAuth(),
    zValidator("param", z.object({ productId: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const { productId } = c.req.valid("param");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const [data] = await db
        .select()
        .from(Product)
        .where(eq(Product.id, productId));

      if (!data) return c.json({ error: "Product not found" }, 404);

      return c.json({ data });
    },
  )
  .post(
    "/",
    verifyAuth(),
    zValidator("json", InsertProductSchema),
    async (c) => {
      const auth = c.get("authUser");
      const {
        description,
        image_url,
        name,
        price,
        category_id,
        colors,
        sizes,
        quantity,
        supplier_id,
      } = c.req.valid("json");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const [data] = await db
        .insert(Product)
        .values({
          description,
          image_url,
          name,
          price,
          category_id,
          colors,
          sizes,
          quantity,
          supplier_id,
        })
        .returning();

      if (!data) return c.json({ error: "Failed to create product" }, 400);

      return c.json({ data });
    },
  )
  .patch(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", InsertProductSchema),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");
      const {
        description,
        image_url,
        name,
        price,
        category_id,
        colors,
        quantity,
        sizes,
        supplier_id,
      } = c.req.valid("json");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const [data] = await db
        .update(Product)
        .set({
          description,
          image_url,
          name,
          price,
          category_id,
          colors,
          quantity,
          sizes,
          supplier_id,
        })
        .where(eq(Product.id, id))
        .returning();

      if (!data) return c.json({ error: "Product not found" }, 404);

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
        .delete(Product)
        .where(eq(Product.id, id))
        .returning();

      if (!data) return c.json({ error: "Product not found" }, 404);

      return c.json({ data });
    },
  );
