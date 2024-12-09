// import "dotenv/config";
// import { drizzle } from "drizzle-orm/postgres-js";

// export const db = drizzle(dburl);

import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export let dburl =
  process.env.NODE_ENV === "development"
    ? process.env.DATABASE_URL
    : process.env.TEST_DATABASE_URL;

// Initialize the database connection globally
const client = postgres(dburl, { prepare: false });
export const db = drizzle({ client });

// Optionally, define a main function if needed for additional setup
async function main() {
  // You can perform additional setup inside the main function if necessary
  // But the `db` instance is already available globally
  console.log("DB initialized");
}

main(); // Call the main function if needed, but `db` is already exported
