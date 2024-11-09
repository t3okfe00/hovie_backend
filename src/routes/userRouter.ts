import { Router, Request, Response, NextFunction } from "express";
import { getUsers, logOutUser } from "../controller/userController";
import { signUp, loginUser } from "../controller/authController";
import { validateSignUp } from "../controller/authController";
import { deleteUser } from "../controller/userController";
import { authenticateJWT } from "../middleware/authenticateJWT";

const router = Router();

router.get(
  "/",
  authenticateJWT,
  (req: Request, res: Response, next: NextFunction) => {
    res.send("Welcome to the route!");
  }
);
router.post("/login", loginUser);
router.post("/signup", validateSignUp, signUp);
router.delete("/:userId", authenticateJWT, deleteUser);
router.get("/logout", logOutUser);

export default router;
