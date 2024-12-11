import { db } from "@/db";
import { InsertOrderItemSchema, OrderItem } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

export const orderItems = new Hono()
  .get("/", verifyAuth(), async (c) => {
    const auth = c.get("authUser");

    if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

    const data = await db
      .select()
      .from(OrderItem)
      .where(eq(OrderItem.user_id, auth.token.id as string));

    return c.json({ data });
  })
  .get(
    "/order/:orderId/product/:productId",
    verifyAuth(),
    zValidator(
      "param",
      z.object({ orderId: z.string(), productId: z.string() }),
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { orderId, productId } = c.req.valid("param");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const [data] = await db
        .select()
        .from(OrderItem)
        .where(
          and(
            eq(OrderItem.product_id, productId),
            eq(OrderItem.order_id, orderId),
          ),
        );

      if (!data) return c.json({ error: "OrderItem not found" }, 404);

      return c.json({ data });
    },
  )
  .post(
    "/",
    verifyAuth(),
    zValidator("json", InsertOrderItemSchema),
    async (c) => {
      const auth = c.get("authUser");
      const orderItem = c.req.valid("json");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const [data] = await db
        .insert(OrderItem)
        .values({ ...orderItem, user_id: auth.token.id as string })
        .returning();

      return c.json({ data });
    },
  )
  .patch(
    "/order/:orderId/product/:productId",
    verifyAuth(),
    zValidator(
      "param",
      z.object({ orderId: z.string(), productId: z.string() }),
    ),
    zValidator("json", InsertOrderItemSchema),
    async (c) => {
      const auth = c.get("authUser");
      const { orderId, productId } = c.req.valid("param");
      const orderItem = c.req.valid("json");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const [data] = await db
        .update(OrderItem)
        .set(orderItem)
        .where(
          and(
            eq(OrderItem.user_id, auth.token.id as string),
            eq(OrderItem.order_id, orderId),
            eq(OrderItem.product_id, productId),
          ),
        )
        .returning();

      return c.json({ data });
    },
  )
  .delete(
    "/order/:orderId/product/:productId",
    verifyAuth(),
    zValidator(
      "param",
      z.object({ orderId: z.string(), productId: z.string() }),
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { orderId, productId } = c.req.valid("param");

      if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

      const [data] = await db
        .delete(OrderItem)
        .where(
          and(
            eq(OrderItem.user_id, auth.token.id as string),
            eq(OrderItem.order_id, orderId),
            eq(OrderItem.product_id, productId),
          ),
        )
        .returning();

      if (!data) return c.json({ error: "Order item not found" }, 404);

      return c.json({ data });
    },
  );
