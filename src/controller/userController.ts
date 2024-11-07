import { getAllUsers, createUser } from "../models/userModel";
import { NextFunction, Request, Response } from "express-serve-static-core";
import ApiError from "../helpers/ApiError";
import { User } from "../types";
import { create } from "domain";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    next(new ApiError("Failed to fetch users from the database", 500));
  }
};

export { getUsers };
