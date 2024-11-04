import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import { usersTable } from "../dbtest/schematest";

console.log("*******", process.env.NODE_ENV);
let dburl =
  process.env.NODE_ENV === "development"
    ? process.env.DATABASE_URL
    : process.env.TEST_DATABASE_URL;
export const db = drizzle(dburl!);
