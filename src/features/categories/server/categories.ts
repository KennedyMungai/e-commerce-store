import { Hono } from "hono";

const app = new Hono().get("/", async (c) => {
  return c.json({ message: "Categories" });
});

export default app;
