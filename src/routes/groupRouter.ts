import { Router, Request, Response } from "express";
import { getGroup, createGroup } from "../controller/groupController";
import {create} from "node:domain";
const router = Router();

router.get("/groups", getGroup);
router.post("/group", createGroup);

export default router;