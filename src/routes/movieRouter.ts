// //test

// // routes/movieRoutes.js
// import { Router } from "express";
// import { getPopularMovies, getMovieDetails, searchMovies, getMovieGenres, getMovieCredits, getSimilarMovies, getMovieRecommendations, getMovieVideos, getMovieImages,getMovieReleaseDates } from "../controller/movieController";

// const router = Router();
// router.get('/movie/popular', getPopularMovies);
// router.get('/movie/:id', getMovieDetails);
// router.get('/movie/search', searchMovies);
// router.get('/movie/genres', getMovieGenres);
// router.get('/movie/:id/credits', getMovieCredits);
// router.get('/movie/:id/similar', getSimilarMovies);
// router.get('/movie/:id/recommendations',getMovieRecommendations);
// router.get('/movie/:id/videos', getMovieVideos);
// router.get('/movie/:id/images', getMovieImages);
// router.get('/movie/:id/releases', getMovieReleaseDates);

// export default router;

// routes/movieRoutes.js
import { Router } from "express";
import {
  getPopularMovies,
  getMovieDetails,
  searchMovies,
  getMovieGenres,
  getMovieCredits,
  getSimilarMovies,
  getMovieRecommendations,
  getMovieVideos,
  getMovieImages,
  getMovieReleaseDates,
} from "../controller/movieController";

const router = Router();

/**
 * @swagger
 * /movie/popular:
 *   get:
 *     summary: Get popular movies
 *     description: Fetch a list of popular movies
 *     responses:
 *       200:
 *         description: Successfully retrieved popular movies
 */
router.get("/popular", getPopularMovies);

/**
 * @swagger
 * /movie/search:
 *   get:
 *     summary: Search for movies
 *     description: Search for movies based on a query
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: The search term
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results returned successfully
 */
router.get("/search", searchMovies);

/**
 * @swagger
 * /movie/{id}:
 *   get:
 *     summary: Get movie details
 *     description: Retrieve details for a specific movie by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved movie details
 *       404:
 *         description: Movie not found
 */
router.get("/:id", getMovieDetails);

/**
 * @swagger
 * /movie/genres:
 *   get:
 *     summary: Get movie genres
 *     description: Fetch a list of all available movie genres
 *     responses:
 *       200:
 *         description: Successfully retrieved movie genres
 */
router.get("/genres", getMovieGenres);

/**
 * @swagger
 * /movie/{id}/credits:
 *   get:
 *     summary: Get movie credits
 *     description: Retrieve cast and crew information for a specific movie
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved movie credits
 */
router.get("/:id/credits", getMovieCredits);

/**
 * @swagger
 * /movie/{id}/similar:
 *   get:
 *     summary: Get similar movies
 *     description: Fetch a list of movies similar to the specified movie
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved similar movies
 */
router.get("/:id/similar", getSimilarMovies);

/**
 * @swagger
 * /movie/{id}/recommendations:
 *   get:
 *     summary: Get movie recommendations
 *     description: Fetch movie recommendations based on a specific movie
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved movie recommendations
 */
router.get("/:id/recommendations", getMovieRecommendations);

/**
 * @swagger
 * /movie/{id}/videos:
 *   get:
 *     summary: Get movie videos
 *     description: Retrieve video content (e.g., trailers) for a specific movie
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved movie videos
 */
router.get("/:id/videos", getMovieVideos);

/**
 * @swagger
 * /movie/{id}/images:
 *   get:
 *     summary: Get movie images
 *     description: Fetch images related to a specific movie
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved movie images
 */
router.get("/:id/images", getMovieImages);

/**
 * @swagger
 * /movie/{id}/releases:
 *   get:
 *     summary: Get movie release dates
 *     description: Retrieve release date information for a specific movie
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved movie release dates
 */
router.get("/:id/releases", getMovieReleaseDates);

export default router;
