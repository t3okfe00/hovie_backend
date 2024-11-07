import { User } from "../types";
import { createUser, updateUserProfileUrl } from "./../models/user";
import { body, validationResult } from "express-validator";
import { NextFunction, Request, RequestHandler, Response } from "express";
import ApiError from "../helpers/ApiError";
import { v4 as uuidv4 } from "uuid";

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
) => {
  const { name, email, password } = req.body;
  const temporaryProfileUrl = `/users/${uuidv4()}`;
  const userDataToDB = {
    name,
    email,
    password,
    profileUrl: temporaryProfileUrl,
  };

  // Sending data with profileUrl = uuid ID.

  console.log("SENDING INFORMATION :", userDataToDB);
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
  } catch (error) {
    console.log("ERROR!", error);
    next(new ApiError("Error creating user", 500));
  }
};
