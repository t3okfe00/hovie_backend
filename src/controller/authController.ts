import {
  createUser,
  getUserByEmail,
  updateUserProfileUrl,
} from "../models/userModel";
import { body, validationResult } from "express-validator";
import { NextFunction, Request, RequestHandler, Response } from "express";
import ApiError from "../helpers/ApiError";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { User } from "../types";
import jwt from "jsonwebtoken";

export const validateSignUp: RequestHandler[] = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/(?=.*[A-Z])/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/(?=.*\d)/)
    .withMessage("Password must contain at least one number"),
  body("name").notEmpty().withMessage("Name is required"),

  // Sanitize inputs
  body("email").normalizeEmail(),
  body("password").escape(),

  // Middleware to handle validation errors
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, email, password } = req.body;
  console.log("POST /signup", req.body);
  const temporaryProfileUrl = `/users/${uuidv4()}`;
  const userDataToDB = {
    name,
    email,
    password,
    profileUrl: temporaryProfileUrl,
  };

  // Sending data with profileUrl = uuid ID.

  try {
    const newUser: User = await createUser(userDataToDB);

    const updatedURL = `/users/${newUser.id}`;
    const userWithUpdatedURL = await updateUserProfileUrl(
      newUser.id,
      updatedURL
    );

    const userData = {
      id: newUser.id,
      email: newUser.email,
      createAt: newUser.createdAt,
      name: newUser.name,
      profileUrl: updatedURL,
    };

    res.status(201).location(`/user/${newUser.id}`).json(userData);
    return;
  } catch (error) {
    next(new ApiError("Error creating user", 500));
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new ApiError("Missing credentials", 400));
    return;
  }

  const user: User[] = await getUserByEmail(email);

  if (user.length == 0) {
    res.status(401).json({ message: "Invalid Credentials" });
    return;
  }
  const isPasswordValid = await bcrypt.compare(password, user[0].password);
  if (!isPasswordValid) {
    return next(new ApiError("Invalid Credentials", 401));
  }

  const token: string = jwt.sign(
    { userId: user[0].id, email: user[0].email, name: user[0].name }, // Payload (you can include more info here)
    process.env.JWT_SECRET as jwt.Secret, // Secret key
    { expiresIn: "24h" } // Token expiration time (e.g., 24 hour)
  );

  // Cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "none", // Use lowercase values
    secure: process.env.NODE_ENV === "development",
    maxAge: 3600000,
  });

  res.json({
    message: "Login successful",

    user: {
      id: user[0].id,
      email: user[0].email,
      name: user[0].name,
      profileUrl: user[0].profileUrl,
    },
  });
};
