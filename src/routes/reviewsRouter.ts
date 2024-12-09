// @ts-nocheck
import { getReviewsByMovie, createReview } from "./../models/reviewModel";
import { authenticateJWT } from "../middleware/authenticateJWT";
import { Router } from "express";
import { deleteReview } from "../models/reviewModel";

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to the reviews route!");
});

router.post("/:id", authenticateJWT, async (req, res) => {
  const { comment, rating, finnId } = req.body;
  const movieId = req.params.id;
  const { userId, name } = req.user;
  console.log("NAME : ", name);

  try {
    const result = await createReview(
      movieId,
      userId,
      rating,
      comment,
      finnId,
      name
    );
    res.json({ message: "Review submitted successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", authenticateJWT, async (req, res) => {
  try {
    const result = await deleteReview(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  console.log("Fetching reviews of movie with ID", req.params.id);
  const { page = 1, limit = 3 } = req.query;
  const offset = (Number(page) - 1) * Number(limit);
  try {
    const { reviews, totalReviews } = await getReviewsByMovie(
      Number(req.params.id),
      3,
      offset
    );
    const totalPages = Math.ceil(totalReviews / Number(limit));
    res.json({ reviews, totalReviews, totalPages, currentPage: Number(page) });
  } catch (error) {
    console.log("Error fetching reviews of movie with ID", req.params.id);
  }

  try {
    const reviews = await getReviewsByMovie(Number(req.params.id), 10, 0);
    res.status(200).json(reviews);
  } catch (error) {}
});

export default router;
