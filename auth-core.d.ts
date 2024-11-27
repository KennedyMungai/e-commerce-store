import { type AdapterUser as DefaultAdapterUser } from "@auth/core/types";

declare module "@auth/core/adapters" {
  interface AdapterUser extends DefaultAdapterUser {
    role: (typeof users.$inferSelect)["role"];
  }
}
