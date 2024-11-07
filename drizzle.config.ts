import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { dburl } from "./src/db";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: dburl!,
  },
});
