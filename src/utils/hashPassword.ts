// src/utils/hashUtils.ts

import ApiError from "../helpers/ApiError";
import bcrypt from "bcryptjs";
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    throw new ApiError("Error hashing password", 500);
  }
};
