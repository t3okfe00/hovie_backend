// src/controller/movieController.ts
import { NextFunction, Request, Response } from "express";
import movieService from "../services/movieService";
import ApiError from "../helpers/ApiError";
import { error } from "console";

async function handleResponse(
  res: Response,
  serviceFunction: Function,
  next: NextFunction
) {
  try {
    const data = await serviceFunction();
    // console.log(`DATA FROM HANDLE RESPONSE`,data)
    res.status(200).json(data); // Assuming `data` is of type `SuccessResponse`
  } catch (error) {
    console.log(" AY RUN ! XD");
    next(error);
  }
}

export const getPopularMovies = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  handleResponse(
    res,
    () => {
      const page = parseInt((req.query.page as string) || "1");
      const language = req.query.language as string;
      return movieService.getPopularMovies(page, language);
    },
    next
  );

export const getMovieDetails = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  handleResponse(
    res,
    () => {
      console.log("GET MOVIE DETAILS", req.params.id);
      return movieService.getMovieDetails(parseInt(req.params.id));
    },
    next
  );

export const searchMovies = (req: Request, res: Response, next: NextFunction) =>
  handleResponse(
    res,
    () => {
      const query = req.query.query as string;

      if (!query) {
        throw new ApiError("Query parameter is required", 400);
      }
      const primaryReleaseYear = req.query.primary_release_year as string;
      const page = req.query.page ? parseInt(req.query.page as string) : 1; // Default to page 1 if not provided
      const region = req.query.region as string;
      const year = req.query.year as string;
      return movieService.searchMovies(query, {
        primaryReleaseYear,
        page,
        region,
        year,
      });
    },
    next
  );

export const getMovieGenres = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  handleResponse(
    res,
    () => {
      console.log("GET MOVIE GENRES");
      return movieService.getMovieGenres();
    },
    next
  );

export const getMovieCredits = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  handleResponse(
    res,
    () => {
      return movieService.getMovieCredits(parseInt(req.params.id));
    },
    next
  );
export const getSimilarMovies = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  handleResponse(
    res,
    () => {
      let page = parseInt((req.query.page as string) || "1");
      let movieId = parseInt(req.params.id);
      return movieService.getSimilarMovies(movieId, page);
    },
    next
  );
export const getMovieRecommendations = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  handleResponse(
    res,
    () => {
      let movieId = parseInt(req.params.id);
      let page = parseInt((req.query.page as string) || "1");
      return movieService.getMovieRecommendations(movieId, page);
    },
    next
  );
export const getMovieVideos = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  handleResponse(
    res,
    () => {
      return movieService.getMovieVideos(parseInt(req.params.id));
    },
    next
  );
export const getMovieImages = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  handleResponse(
    res,
    () => {
      let movieId = parseInt(req.params.id);
      return movieService.getMovieImages(movieId);
    },
    next
  );
export const getMovieReleaseDates = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  handleResponse(
    res,
    () => {
      return movieService.getMovieReleaseDates(parseInt(req.params.id));
    },
    next
  );
