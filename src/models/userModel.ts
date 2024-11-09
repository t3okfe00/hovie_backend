import {
  pgTable,
  foreignKey,
  serial,
  integer,
  varchar,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { sql, eq } from "drizzle-orm";
import { db } from "../db";
import { User, CreateUserInput } from "../types";
import { hashPassword } from "../utils/hashPassword";
import { usersTable } from "../dbtest/schematest";

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

export const createUser = async (userData: CreateUserInput): Promise<User> => {
  const hashedPassword = await hashPassword(userData.password);

  await db.insert(users).values({ ...userData, password: hashedPassword });

  const [newUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, userData.email)); // Assuming email is unique

  console.log("NEW USER RETURNED!", newUser);
  return newUser;
};

export const updateUserProfileUrl = async (
  userId: number,
  newProfileUrl: string
) => {
  try {
    // Update the profileUrl where the user's id matches
    const result = await db
      .update(users)
      .set({ profileUrl: newProfileUrl })
      .where(eq(users.id, userId)); // Condition to match the userId

    if (result.count === 0) {
      throw new Error("User not found or profileUrl not updated");
    }

    console.log(`User with ID ${userId} updated successfully.`);
    return result; // Optionally, return the result if needed
  } catch (error) {
    console.error("Error updating profileUrl:", error);
    throw error; // Rethrow error to handle it higher up in the call stack
  }
};

export const getUserByEmail = async (email: string): Promise<User[]> => {
  return await db.select().from(users).where(eq(users.email, email));
};

export const deleteUserById = async (id: number) => {
  return await db.delete(users).where(eq(users.id, id));
};
