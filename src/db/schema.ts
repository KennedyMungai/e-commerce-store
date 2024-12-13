import { relations, sql } from "drizzle-orm";
import {
  boolean,
  decimal,
  geometry,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const RoleEnum = pgEnum("role", ["user", "admin", "superadmin"]);

export const ShippingMethods = pgEnum("shipping_method", [
  "standard",
  "express",
]);

export const SizeEnum = z.enum(["XS", "S", "M", "L", "XL", "XXL", "XXXL"]);

export const OrderStatus = pgEnum("order_status", [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]);

export const users = pgTable(
  "user",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    password: varchar("password", { length: 512 }),
    role: RoleEnum("role").default("user").notNull(),
  },
  (table) => ({
    emailUniqueIndex: uniqueIndex("emailUniqueIndex").on(table.email),
  }),
);

export const UserRelations = relations(users, ({ many }) => ({
  wishlists: many(WishList),
  comments: many(Comment),
  orders: many(Order),
}));

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }),
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  }),
);

export const PasswordResetToken = pgTable(
  "passwordResetToken",
  {
    email: varchar("email", { length: 256 }).notNull(),
    token: varchar("token", { length: 256 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (table) => {
    return {
      compositeKey: primaryKey({
        columns: [table.email, table.token],
      }),
    };
  },
);

export const Product = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description").notNull(),
  price: decimal("price").notNull(),
  image_url: varchar("image_url", { length: 256 }),
  colors: text("colors")
    .array()
    .default(sql`ARRAY[]::text[]`),
  sizes: text("colors")
    .array()
    .default(sql`ARRAY[]::text[]`),
  supplier_id: uuid("supplier_id")
    .references(() => Supplier.id, {
      onDelete: "cascade",
    })
    .notNull(),
  category_id: uuid("category_id")
    .references(() => Category.id, {
      onDelete: "cascade",
    })
    .notNull(),
  quantity: integer("quantity").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const ProductRelations = relations(Product, ({ many, one }) => ({
  supplier: one(Supplier, {
    fields: [Product.supplier_id],
    references: [Supplier.id],
  }),
  category: one(Category, {
    fields: [Product.category_id],
    references: [Category.id],
  }),
  comments: many(Comment),
  wishlists: many(WishList),
}));

export const InsertProductSchema = createInsertSchema(Product)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    colors: z
      .union([z.string(), z.array(z.string())])
      .transform((value) => (Array.isArray(value) ? value : [value])),
    sizes: z
      .union([SizeEnum, z.array(SizeEnum)])
      .transform((value) => (Array.isArray(value) ? value : [value])),
  });

export type InsertProductType = z.infer<typeof InsertProductSchema>;

export const SelectProductSchema = createSelectSchema(Product).extend({
  colors: z
    .union([z.string(), z.array(z.string())])
    .transform((value) => (Array.isArray(value) ? value : [value])),
  sizes: z
    .union([SizeEnum, z.array(SizeEnum)])
    .transform((value) => (Array.isArray(value) ? value : [value])),
});

export type SelectProductType = z.infer<typeof SelectProductSchema>;

export const Category = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const CategoryRelations = relations(Category, ({ many }) => ({
  products: many(Product),
}));

export const InsertCategorySchema = createInsertSchema(Category).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertCategoryType = z.infer<typeof InsertCategorySchema>;

export const SelectCategorySchema = createSelectSchema(Category);

export type SelectCategoryType = z.infer<typeof SelectCategorySchema>;

export const Order = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  location: geometry("location", { type: "point", mode: "xy", srid: 4326 }),
  shippingMethod: ShippingMethods("shipping_method").notNull(),
  orderStatus: OrderStatus("order_status").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const OrderRelations = relations(Order, ({ one, many }) => ({
  user: one(users, {
    fields: [Order.user_id],
    references: [users.id],
  }),
  orderItems: many(OrderItem),
}));

export const InsertOrderSchema = createInsertSchema(Order).omit({
  id: true,
  user_id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertOrderType = z.infer<typeof InsertOrderSchema>;

export const SelectOrderSchema = createSelectSchema(Order);

export type SelectOrderType = z.infer<typeof SelectOrderSchema>;

export const OrderItem = pgTable(
  "order_items",
  {
    product_id: uuid("product_id")
      .references(() => Product.id, { onDelete: "cascade" })
      .notNull(),
    order_id: uuid("order_id").references(() => Order.id, {
      onDelete: "cascade",
    }),
    user_id: text("user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    quantity: integer("quantity").default(1).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.product_id, table.order_id] }),
  }),
);

export const OrderItemRelations = relations(OrderItem, ({ one }) => ({
  product: one(Product, {
    fields: [OrderItem.product_id],
    references: [Product.id],
  }),
  order: one(Order, {
    fields: [OrderItem.order_id],
    references: [Order.id],
  }),
  user: one(users, {
    fields: [OrderItem.user_id],
    references: [users.id],
  }),
}));

export const InsertOrderItemSchema = createInsertSchema(OrderItem).omit({
  createdAt: true,
  updatedAt: true,
});

export type InsertOrderItemType = z.infer<typeof InsertOrderItemSchema>;

export const SelectOrderItemSchema = createSelectSchema(OrderItem);

export type SelectOrderItemType = z.infer<typeof SelectOrderItemSchema>;

export const Comment = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  product_id: uuid("product_id").references(() => Product.id, {
    onDelete: "cascade",
  }),
  commentText: text("comment").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const CommentRelations = relations(Comment, ({ one }) => ({
  product: one(Product, {
    fields: [Comment.product_id],
    references: [Product.id],
  }),
  user: one(users, {
    fields: [Comment.user_id],
    references: [users.id],
  }),
}));

export const InsertCommentSchema = createInsertSchema(Comment).omit({
  id: true,
  user_id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertCommentType = z.infer<typeof InsertCommentSchema>;

export const SelectCommentSchema = createSelectSchema(Comment);

export type SelectCommentType = z.infer<typeof SelectCommentSchema>;

export const ProductRating = pgTable(
  "product_ratings",
  {
    user_id: text("user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    product_id: uuid("product_id").references(() => Product.id, {
      onDelete: "cascade",
    }),
    rating: integer("rating").default(0).notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.user_id, table.product_id],
    }),
  }),
);

export const ProductRatingRelations = relations(ProductRating, ({ one }) => ({
  product: one(Product, {
    fields: [ProductRating.product_id],
    references: [Product.id],
  }),
  user: one(users, {
    fields: [ProductRating.user_id],
    references: [users.id],
  }),
}));

export const InsertProductRatingSchema = createInsertSchema(ProductRating).omit(
  {
    user_id: true,
  },
);

export type InsertProductRatingType = z.infer<typeof InsertProductRatingSchema>;

export const SelectProductRatingSchema = createSelectSchema(ProductRating);

export type SelectProductRatingType = z.infer<typeof SelectProductRatingSchema>;

export const Supplier = pgTable("suppliers", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 13 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const SupplierRelations = relations(Supplier, ({ many }) => ({
  products: many(Product),
}));

export const InsertSupplierSchema = createInsertSchema(Supplier).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertSupplierType = z.infer<typeof InsertSupplierSchema>;

export const SelectSupplierSchema = createSelectSchema(Supplier);

export type SelectSupplierType = z.infer<typeof SelectSupplierSchema>;

export const WishList = pgTable("wishlists", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  product_id: uuid("product_id").references(() => Product.id, {
    onDelete: "cascade",
  }),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const WishListRelations = relations(WishList, ({ one }) => ({
  user: one(users, {
    fields: [WishList.user_id],
    references: [users.id],
  }),
  product: one(Product, {
    fields: [WishList.product_id],
    references: [Product.id],
  }),
}));

export const InsertWishListSchema = createInsertSchema(WishList).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type InsertWishListType = z.infer<typeof InsertWishListSchema>;

export const SelectWishListSchema = createSelectSchema(WishList);

export type SelectWishListType = z.infer<typeof SelectWishListSchema>;

// TODO: Add a table for payment
