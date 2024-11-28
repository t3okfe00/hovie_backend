import { favorites } from "./../db/schema";
import { NextFunction, Router, Request, Response } from "express";
import {
  saveFavorite,
  getFavoritesByUser,
  deleteFavoriteByUserAndMovie,
} from "../models/favoritesModel";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { userId, email } = req.user;
  const { movieId, movieName } = req.body;
  console.log("UserId:", userId);
  console.log("Email:", email);
  console.log("MovieId:", movieId);
  console.log("MovieName:", movieName);

  try {
    const result = await saveFavorite(userId, movieId, movieName);
    res.status(201).json({ message: "Movie added to favorites", result });
  } catch (error) {
    next(error);
  }
});
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const { userId, email } = req.user;
  try {
    const favorites = await getFavoritesByUser(userId);
    res
      .status(200)
      .json({ message: "Favorites fetched successfully", favorites });
  } catch (error) {
    next(error);
  }
});

router.delete("/", (req: Request, res: Response, next: NextFunction) => {
  const { userId, email } = req.user;
  const { movieId, movieName } = req.body;

  try {
    const result = deleteFavoriteByUserAndMovie(userId, movieId);
    res.status(200).json({ message: "Favorite deleted successfully", result });
  } catch (error) {
    next(error);
  }
  res.send("Welcome to the favorites DELETE ROUTE!");
});

export default router;
