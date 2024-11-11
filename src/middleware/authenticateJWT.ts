import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import ApiError from "../helpers/ApiError";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new ApiError("Unauthorized", 401));
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as jwt.Secret,
    (err: any, user: any) => {
      console.log("JWT Verifying!");
      if (err) {
        console.log("Error happened", err);
        return next(new ApiError("Unauthorized token", 403));
      }

      req.user = user;
      next();
    }
  );
};
