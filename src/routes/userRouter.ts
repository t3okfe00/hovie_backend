import { Router, Request, Response } from "express";
import { getUsers } from "../controller/userController";
const router = Router();

router.use("/users", getUsers);

export default router;
