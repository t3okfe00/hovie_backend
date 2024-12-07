import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import ApiError from "../helpers/ApiError";
import { getUserByEmail } from "../models/userModel";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;
  console.log("REQUEST COOKIES", req.cookies.jwt);
  console.log("Authenticating JWT. . .");

  if (!token) {
    console.log("No token found");
    return next(new ApiError("Unauthorized", 401));
  }

  jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (err: any, user) => {
    console.log("JWT Verifying!");
    console.log("THE USER IS ----------", user);

    if (err) {
      console.log("Error happened", err);
      return next(new ApiError("Unauthorized token", 403));
    }

    req.user = user;
    console.log("The authenticated user is -->", user.email);
    next();
  });
};
