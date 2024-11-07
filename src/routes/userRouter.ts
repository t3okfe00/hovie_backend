import { Router, Request, Response } from "express";
import { getUsers } from "../controller/userController";
import { signUp } from "../controller/authController";
import { validateSignUp } from "../controller/authController";

const router = Router();

router.get("/", getUsers);
router.post("/signup", validateSignUp, signUp);

export default router;
