import { Router, Request, Response } from "express";
import { getAllUsers } from "../model/model";
const router = Router();

router.use("/users", async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json(users);
});

export default router;
