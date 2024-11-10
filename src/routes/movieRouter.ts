//test

// routes/movieRoutes.js
import { Router } from "express";
import { getPopularMovies, getMovieDetails, searchMovies, getMovieGenres, getMovieCredits, getSimilarMovies, getMovieRecommendations, getMovieVideos, getMovieImages,getMovieReleaseDates } from "../controller/movieController";

const router = Router();
router.get('/movie/popular', getPopularMovies);
router.get('/movie/:id', getMovieDetails);
router.get('/movie/search', searchMovies);
router.get('/movie/genres', getMovieGenres);
router.get('/movie/:id/credits', getMovieCredits);
router.get('/movie/:id/similar', getSimilarMovies);
router.get('/movie/:id/recommendations',getMovieRecommendations);
router.get('/movie/:id/videos', getMovieVideos);
router.get('/movie/:id/images', getMovieImages);
router.get('/movie/:id/releases', getMovieReleaseDates);

export default router;