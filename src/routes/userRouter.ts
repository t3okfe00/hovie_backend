// @ts-nocheck
import { Router, Request, Response, NextFunction } from "express";
import { logOutUser, me } from "../controller/userController";
import { signUp, loginUser } from "../controller/authController";
import { validateSignUp } from "../controller/authController";
import { deleteUser } from "../controller/userController";
import { authenticateJWT } from "../middleware/authenticateJWT";

const router = Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Welcome route (requires JWT)
 *     description: A simple route to check authentication status
 *     responses:
 *       200:
 *         description: Returns a welcome message
 *       401:
 *         description: Unauthorized, authentication required
 */
router.get(
  "/",
  authenticateJWT,
  (req: Request, res: Response, next: NextFunction) => {
    res.send("Welcome to the route!");
  }
);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     description: Logs in a user by authenticating credentials
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       400:
 *         description: Invalid input
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     description: Signs up a new user with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Invalid input
 */
router.post("/signup", validateSignUp, signUp);

/**
 * @swagger
 * /user/{userId}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user by their ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/delete", authenticateJWT, deleteUser);

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Logout the user
 *     description: Logs out the user by invalidating the session or token
 *     responses:
 *       200:
 *         description: Successfully logged out
 */
router.post("/logout", logOutUser);

router.get("/me", authenticateJWT, me);

export default router;
