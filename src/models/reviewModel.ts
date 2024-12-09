// @ts-nocheck
import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { count } from "drizzle-orm";
import { sql, eq, desc } from "drizzle-orm";
import { db } from "../db";
import { users } from "./userModel";

export const reviews = pgTable("reviews", {
  id: serial().primaryKey().notNull(),
  moviesId: integer("movies_id").notNull(),
  usersId: integer("users_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  userName: varchar("user_name", { length: 255 }), // New column for user name

  rating: integer(),
  description: varchar({ length: 500 }),
  createdAt: timestamp("created_at", { mode: "string" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  upvote: integer().default(0),
  finnId: integer("finn_id"),
});

// Function to create a review
export const createReview = async (
  moviesId: number,
  usersId: number,
  rating: number,
  description: string,
  finnId?: string,
  userName?: string
) => {
  try {
    const result = await db
      .insert(reviews)
      .values({
        moviesId,
        usersId,
        rating,
        description,
        finnId,
        userName,
      })
      .returning();
    console.log("Review created successfully!");
    return result;
  } catch (error) {
    console.error("Error creating review:", error);
    throw new Error("Error creating review");
  }
};

// Function to delete a review
export const deleteReview = async (reviewId: number) => {
  try {
    const result = await db.delete(reviews).where(eq(reviews.id, reviewId));
    console.log("Review deleted successfully!");
    return result;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw new Error("Error deleting review");
  }
};

// Function to get reviews for a specific movie
export const getReviewsByMovie = async (
  moviesId: number,
  limit: number = 3,
  offset: number
) => {
  try {
    const movieReviews = await db
      .select()
      .from(reviews)
      .limit(limit)
      .offset(offset)
      .orderBy(desc(reviews.createdAt))
      .where(eq(reviews.moviesId, moviesId));

    // total number of reviews for the movie

    const totalReviews = await db
      .select({ count: count() }) // Adjust count query
      .from(reviews)
      .where(eq(reviews.moviesId, moviesId))
      .execute();

    return { reviews: movieReviews, totalReviews: totalReviews[0].count };
  } catch (error) {
    console.error("Error fetching reviews for the movie:", error);
    throw new Error("Failed to retrieve reviews");
  }
};
