// src/controller/movieController.ts
import { Request, Response } from "express";
import movieService from "../services/movieService";

async function handleResponse(res: Response, serviceFunction: Function) {
  try {
    const data = await serviceFunction();
    // console.log(`DATA FROM HANDLE RESPONSE`,data)
    res.status(200).json(data); // Assuming `data` is of type `SuccessResponse`
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" }); // Error response
  }
}

export const getPopularMovies = (req: Request, res: Response) =>
  handleResponse(res, () =>
    movieService.getPopularMovies(parseInt(req.query.page))
  );
export const getMovieDetails = (req: Request, res: Response) =>
  handleResponse(res, () =>
    movieService.getMovieDetails(parseInt(req.params.id))
  );
export const searchMovies = (req: Request, res: Response) =>
  handleResponse(res, () =>
    movieService.searchMovies(req.query.query as string)
  );
export const getMovieGenres = (req: Request, res: Response) =>
  handleResponse(res, movieService.getMovieGenres);
export const getMovieCredits = (req: Request, res: Response) =>
  handleResponse(res, () =>
    movieService.getMovieCredits(parseInt(req.params.id))
  );
export const getSimilarMovies = (req: Request, res: Response) =>
  handleResponse(res, () =>
    movieService.getSimilarMovies(parseInt(req.params.id))
  );
export const getMovieRecommendations = (req: Request, res: Response) =>
  handleResponse(res, () =>
    movieService.getMovieRecommendations(parseInt(req.params.id))
  );
export const getMovieVideos = (req: Request, res: Response) =>
  handleResponse(res, () =>
    movieService.getMovieVideos(parseInt(req.params.id))
  );
export const getMovieImages = (req: Request, res: Response) =>
  handleResponse(res, () =>
    movieService.getMovieImages(parseInt(req.params.id))
  );
export const getMovieReleaseDates = (req: Request, res: Response) =>
  handleResponse(res, () =>
    movieService.getMovieReleaseDates(parseInt(req.params.id))
  );
