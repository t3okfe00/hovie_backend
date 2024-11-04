import { Router, Request, Response } from "express";
import { getGroups } from "../controller/groupController";
const router = Router();

router.use("/groups", getGroups);

export default router;