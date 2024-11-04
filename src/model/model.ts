import {
  pgTable,
  foreignKey,
  serial,
  integer,
  varchar,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { db } from "../db";

export const users = pgTable(
  "users",
  {
    id: serial().primaryKey().notNull(),
    email: varchar({ length: 45 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    name: varchar({ length: 45 }).notNull(),
    profileUrl: varchar("profile_url", { length: 70 }).notNull(),
  },
  (table) => {
    return {
      usersEmailKey: unique("users_email_key").on(table.email),
      usersPasswordKey: unique("users_password_key").on(table.password),
    };
  }
);

export const getAllUsers = async () => {
  return await db.select().from(users);
};
