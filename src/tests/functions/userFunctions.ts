import { db } from "../../db/index";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { users } from "../../models/userModel";

export const initializeTestDb = async () => {
  try {
    // Then clear all data from users table
    await db.delete(users);

    console.log("Test database initialized successfully");
  } catch (error) {
    console.error("Error initializing test database:", error);
    throw error;
  }
};
