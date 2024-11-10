import { db } from "../../db/index";
import { users } from "../../models/userModel";

export const initializeTestDb = async () => {
  try {
    // Then clear all data from users table
    const result = await db.delete(users);
    console.log(`Deleted ${result} rows from the users table`);

    console.log("Users deleted successfully");
  } catch (error) {
    console.error("Error initializing test database:", error);
    throw error;
  }
};
