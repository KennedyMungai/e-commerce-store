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
  .get(
    "/supplier/:supplierId",
    verifyAuth(),
    zValidator("param", z.object({ supplierId: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const { supplierId } = c.req.valid("param");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const data = await db
        .select()
        .from(Product)
        .where(eq(Product.supplier_id, supplierId));

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
        name,
        category_id,
        colors,
        description,
        price,
        sizes,
        supplier_id,
        image_url,
        quantity,
      } = c.req.valid("json");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const [data] = await db
        .insert(Product)
        .values({
          name,
          category_id,
          colors,
          description,
          price: price.toString(),
          sizes,
          supplier_id,
          image_url,
          quantity,
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
        category_id,
        colors,
        description,
        price,
        sizes,
        supplier_id,
        image_url,
        name,
        quantity,
      } = c.req.valid("json");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const [data] = await db
        .update(Product)
        .set({
          category_id,
          colors,
          description,
          price: price.toString(),
          sizes,
          supplier_id,
          image_url,
          name,
          quantity,
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
