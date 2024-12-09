import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";

export let dburl =
  process.env.NODE_ENV === "development"
    ? process.env.DATABASE_URL
    : process.env.TEST_DATABASE_URL;

console.log("dburl is", process.env.NODE_ENV);
export const db = drizzle(
  "Please install `postgres` to allow Drizzle ORM to connect to the database"
);
