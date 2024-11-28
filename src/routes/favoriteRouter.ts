import { NextFunction, Router, Request, Response } from "express";

const router = Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("User who makes the request", req.user);
  console.log("Body:", req.body);

  res.send("Welcome to the favorites POST ROUTE!");
});

router.delete("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("User who makes the request", req.user);
  console.log("Body:", req.body);
  res.send("Welcome to the favorites DELETE ROUTE!");
});

export default router;
