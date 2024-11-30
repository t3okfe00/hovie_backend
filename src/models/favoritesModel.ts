import {
  pgTable,
  foreignKey,
  serial,
  integer,
  varchar,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { sql, eq, desc } from "drizzle-orm";
import { db } from "../db";
import { users } from "./userModel";
import { count } from "drizzle-orm";

export const favorites = pgTable("favorites", {
  id: serial().primaryKey().notNull(),
  addedAt: timestamp("added_at", { mode: "string" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  usersId: integer("users_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  moviesId: integer("movies_id").notNull(),
  movieName: varchar("movie_name").notNull(),
});

export const saveFavorite = async (
  usersId: number,
  moviesId: number,
  movieName: string
) => {
  try {
    const result = await db.insert(favorites).values({
      usersId,
      moviesId,
      movieName,
    });
    console.log("Favorite saved to database successfully!");
    return result;
  } catch (error) {
    console.error("Error saving favorite to database", error);
    throw new Error("Error saving favorite to database");
  }
};

// Function to get favorites for a specific user
export const getFavoritesByUser = async (
  userId: number,
  limit: number,
  offset: number
) => {
  try {
    // Use Drizzle ORM syntax to query the favorites table for the userId
    const userFavorites = await db
      .select()
      .from(favorites)
      .limit(limit)
      .offset(offset)
      .orderBy(desc(favorites.addedAt))
      .where(eq(favorites.usersId, userId)); // Use eq() for filtering by usersId

    return userFavorites; // Return the list of favorites
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    throw new Error("Failed to retrieve favorites");
  }
};

export const deleteFavoriteByUserAndMovie = async (
  usersId: number,
  moviesId: number
) => {
  try {
    const result = await db
      .delete(favorites)
      .where(
        sql`${favorites.usersId} = ${usersId} AND ${favorites.moviesId} = ${moviesId}`
      );

    console.log("Favorite deleted from database successfully!");
    return result;
  } catch (error) {
    console.error("Error deleting specific favorite", error);
    throw new Error("Error deleting specific favorite");
  }
};

export async function getFavoritesCountByUserId(
  userId: string
): Promise<number> {
  try {
    const result = await db
      .select({ count: count() })
      .from(favorites)
      .where(eq(favorites.usersId, userId))
      .execute();

    return result[0]?.count ?? 0;
  } catch (error) {
    console.error("Error fetching favorites count:", error);
    throw error;
  }
}
