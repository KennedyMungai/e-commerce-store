import { db } from "@/db";
import { InsertOrderSchema, Order } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

export const orders = new Hono()
  .get("/", verifyAuth(), async (c) => {
    const auth = c.get("authUser");

    if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

    const data = await db.select().from(Order);

    return c.json({ data });
  })
  .get(
    "/:userId",
    verifyAuth(),
    zValidator("param", z.object({ userId: z.string() })),
    async (c) => {
      const auth = await c.get("authUser");
      const { userId } = c.req.valid("param");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const data = await db
        .select()
        .from(Order)
        .where(eq(Order.user_id, userId));

      return c.json({ data });
    },
  )
  .get(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const [data] = await db.select().from(Order).where(eq(Order.id, id));

      if (!data) return c.json({ error: "Order not found" }, 404);

      return c.json({ data });
    },
  )
  .post("/", verifyAuth(), zValidator("json", InsertOrderSchema), async (c) => {
    const auth = c.get("authUser");
    const { shippingMethod, location } = c.req.valid("json");

    if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

    // TODO: Check the types
    const [data] = await db
      .insert(Order)
      .values({ user_id: auth.token.id as string, shippingMethod, location })
      .returning();

    if (!data) return c.json({ error: "Failed to create order" }, 400);

    return c.json({ data });
  })
  .patch(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", InsertOrderSchema),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");
      const { shippingMethod, location } = c.req.valid("json");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      // TODO: Check the types
      const [data] = await db
        .update(Order)
        .set({ shippingMethod, location })
        .where(eq(Order.id, id))
        .returning();

      if (!data) return c.json({ error: "Failed to update order" }, 400);

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

      const [data] = await db.delete(Order).where(eq(Order.id, id)).returning();

      if (!data) return c.json({ error: "Failed to delete order" }, 400);

      return c.json({ data });
    },
  );
