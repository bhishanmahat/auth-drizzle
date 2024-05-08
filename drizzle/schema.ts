import {
  integer,
  text,
  timestamp,
  pgTable,
  uuid,
  primaryKey,
  pgEnum,
  unique,
  boolean,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";

export const roleEnum = pgEnum("role", ["USER", "ADMIN"]);

export const users = pgTable("user", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  role: roleEnum("role").default("USER"),
  isTwoFactorEnabled: boolean("isTwoFactorEnabled").default(false),
});

export const usersRelations = relations(users, ({one}) => ({
  twoFactorConfirmation: one(twoFactorConfirmations, {
    fields:[users.id],
    references: [twoFactorConfirmations.userId]
  })
}))

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
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
  })
);

export const verificationTokens = pgTable(
  "verificationToken",
  {
    id: uuid("id").defaultRandom().notNull().primaryKey(),
    email: text("email"),
    token: text("token").unique(),
    expires: timestamp("expires")
  }, (table) => ({
    unq: unique().on(table.email, table.token)
  })
)

export const passwordResetTokens = pgTable(
  "passwordResetToken", {
    id: uuid("id").defaultRandom().notNull().primaryKey(),
    email: text("email").notNull(),
    token: text("token").notNull().unique(),
    expires: timestamp("expires").notNull(),
  }, (table) => ({
    unq: unique().on(table.email, table.token)
  })
)

export const twoFactorTokens = pgTable(
  "twoFactorToken", {
    id: uuid("id").defaultRandom().notNull().primaryKey(),
    email: text("email").notNull(),
    token: text("token").notNull().unique(),
    expires: timestamp("expires").notNull(),
  }, (table) => ({
    unq: unique().on(table.email, table.token)
  })
)

export const twoFactorConfirmations = pgTable(
  "twoFactorConfirmation", {
    id: uuid("id").defaultRandom().notNull().primaryKey(),
    userId: uuid("userId").notNull().references(() => users.id, {onDelete: "cascade"}).unique()
  }
)
