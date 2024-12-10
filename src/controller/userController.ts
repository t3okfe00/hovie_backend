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
    res.cookie("jwt", "", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production", // Use secure flag in production
      maxAge: 0, // Set maxAge to 0 to expire the cookie immediately
    });
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

  try {
    // Clear the JWT cookie by setting its max-age to 0
    res.cookie("jwt", "", {
      httpOnly: true,
      sameSite: "none", // Use lowercase values
      secure: true,
      maxAge: 0,
    });

    // Send a response indicating that the user has been logged out
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error); // Handle any errors
  }
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return res.status(200).json({
      user: {
        email: req.user.email, // You can include more user fields here
        userId: req.user.userId,
        name: req.user.name,
      },
    });
  }
  console.log("No user found inside the ME ROUTE");
  // In case the middleware allows the request but no user is found
  return res.status(401).json({ message: "Unauthorized: User not found" });
};
