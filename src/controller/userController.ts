import { getAllUsers } from "../model/model";
import { Request, Response } from "express-serve-static-core";

export const getUsers = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json(users);
};
