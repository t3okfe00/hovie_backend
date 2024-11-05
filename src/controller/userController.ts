import { getAllUsers } from "../model/model";
import { NextFunction, Request, Response } from "express-serve-static-core";
import ApiError from "../helpers/ApiError";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.log("Error***", error);
    next(new ApiError("Failed to fetch users from the database", 500));
  }
};

export { getUsers };
