import { favorites } from "./../db/schema";
import { db } from "../db";
import { NextFunction, Router, Request, Response } from "express";
import {
  saveFavorite,
  getFavoritesByUser,
  deleteFavoriteByUserAndMovie,
  getFavoritesCountByUserId,
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
  const { page = 1, limit = 5 } = req.query;
  const offset = (Number(page) - 1) * Number(limit);
  const { userId } = req.user;
  try {
    const favorites = await getFavoritesByUser(userId, Number(limit), offset);
    const totalFavoritesCount = await getFavoritesCountByUserId(userId);
    const totalPages = Math.ceil(totalFavoritesCount / Number(limit));
    console.log("Total Pages:", totalPages);

    console.log("Favorites:", favorites);
    res.status(200).json({
      favorites,
      totalPages,
    });
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
});

export default router;
