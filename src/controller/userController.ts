import { getAllUsers, createUser, deleteUserById } from "../models/userModel";
import { NextFunction, Request, Response } from "express-serve-static-core";
import ApiError from "../helpers/ApiError";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    next(new ApiError("Failed to fetch users from the database", 500));
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user.userId;

  try {
    await deleteUserById(userId);
    res.status(204).json({ message: "User deleted" });
  } catch (error) {
    next(new ApiError("User could not be deleted", 500));
  }
};

export const logOutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;
  console.log("Logout user route");

  if (!token) {
    // If there's no token, the user is already logged out
    next(new ApiError("User is already logged out", 400));
  }

  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1,
  });
  res.json({ message: "Logged Out" });
};
