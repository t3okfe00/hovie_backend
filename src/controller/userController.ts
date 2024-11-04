import { getAllUsers } from "../model/userModel";
import { Request, Response } from "express-serve-static-core";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.json({ message: "Error" });
  }
};
