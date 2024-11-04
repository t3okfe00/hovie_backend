import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import { usersTable } from "../dbtest/schematest";

let dburl =
  process.env.NODE_ENV === "development"
    ? process.env.DATABASE_URL
    : process.env.DATABASE_URL_DEV;
export const db = drizzle(dburl!);
