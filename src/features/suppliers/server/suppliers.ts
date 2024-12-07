import { db } from "@/db";
import { InsertSupplierSchema, Supplier } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

export const suppliers = new Hono()
  .get("/", verifyAuth(), async (c) => {
    const auth = c.get("authUser");

    if (!auth.token?.id) return c.json({ message: "Unauthorized" }, 401);

    const data = await db.select().from(Supplier);

    return c.json({ data });
  })
  .get(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = c.get("authUser");

      const { id } = c.req.valid("param");

      if (!auth.token?.id) return c.json({ message: "Unauthorized" }, 401);

      const [data] = await db
        .select()
        .from(Supplier)
        .where(eq(Supplier.id, id));

      if (!data) return c.json({ error: "Supplier not found" }, 404);

      return c.json({ data });
    },
  )
  .post(
    "/",
    verifyAuth(),
    zValidator("json", InsertSupplierSchema),
    async (c) => {
      const auth = c.get("authUser");
      const supplier = c.req.valid("json");

      if (!auth.token?.id) return c.json({ message: "Unauthorized" }, 401);

      const [data] = await db.insert(Supplier).values(supplier).returning();

      if (!data) return c.json({ error: "Failed to create supplier" }, 400);

      return c.json({ data });
    },
  )
  .patch(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", InsertSupplierSchema),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");
      const supplier = c.req.valid("json");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const [data] = await db
        .update(Supplier)
        .set(supplier)
        .where(eq(Supplier.id, id))
        .returning();

      if (!data) return c.json({ error: "Failed to update supplier" }, 400);

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
        .delete(Supplier)
        .where(eq(Supplier.id, id))
        .returning();

      if (!data) return c.json({ error: "Failed to delete supplier" }, 400);

      return c.json({ data });
    },
  );
