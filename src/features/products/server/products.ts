import { verifyAuth } from "@hono/auth-js";
import { Hono } from "hono";

export const products = new Hono().get("/", verifyAuth(), async (c) => {
  const auth = c.get("authUser");

  if (!auth.token?.id) return c.json({ error: "Unauthorized" }, 401);

  return c.json({ message: "Products route" });
});
