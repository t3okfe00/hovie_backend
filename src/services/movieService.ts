import { json } from "stream/consumers";
import {
  Genre,
  Movie,
  MovieCredits,
  MovieImages,
  MovieReleaseDates,
  MovieVideos,
  MovieRecommendation,
} from "../types";

// services/movieService.js
// const axios = require('axios');
import axios from "axios";

const API_KEY = process.env.TMDB_API_KEY; // Replace with your TMDB API key
const BASE_URL = "http://localhost:3000";

// TMDB Response Shape (generic)
type TMDBResponse<T> = {
  page: number;
  results: T[];
  totalPages: number;
  totalResults: number;
};

// Utility function to fetch data from TMDB API
async function fetchFromTMDB<T>(
  endpoint: string,
  params: Record<string, any> = {}
): Promise<T> {
  const queryString = new URLSearchParams(
    params as Record<string, string>
  ).toString();

  const url = `https://api.themoviedb.org/3${endpoint}?${queryString}`;
  console.log("Final url constructed", url);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  try {
    const popularMovies = await fetch(url, options);
    const data = await popularMovies.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data from TMDB: ${error}`);
    throw error;
  }
}

// Service functions with appropriate types

async function getPopularMovies(
  page: number,
  language: string
): Promise<TMDBResponse<Movie>> {
  return fetchFromTMDB("/movie/popular", { page, language });
}

async function getMovieDetails(movieId: number): Promise<Movie> {
  console.log("MOVIE ID", movieId);
  return fetchFromTMDB(`/movie/${movieId}`);
}

async function searchMovies(
  query: string,
  {
    primaryReleaseYear,
    page,
    region,
    year,
  }: {
    primaryReleaseYear?: string;
    page: number;
    region?: string;
    year?: string;
  }
): Promise<TMDBResponse<Movie>> {
  const params: Record<string, string> = { query, page: page.toString() };
  if (primaryReleaseYear) params.primary_release_year = primaryReleaseYear;
  if (region) params.region = region;
  if (year) params.year = year;
  return fetchFromTMDB("/search/movie", params);
}

async function getMovieGenres(): Promise<{ genres: Genre[] }> {
  return fetchFromTMDB("/genre/movie/list");
}

async function getMovieCredits(movieId: number): Promise<MovieCredits> {
  return fetchFromTMDB(`/movie/${movieId}/credits`);
}

async function getSimilarMovies(
  movieId: number,
  page: number
): Promise<TMDBResponse<Movie>> {
  return fetchFromTMDB(`/movie/${movieId}/similar`, { page });
}

async function getMovieRecommendations(
  movieId: number,
  page: number
): Promise<TMDBResponse<MovieRecommendation>> {
  return fetchFromTMDB(`/movie/${movieId}/recommendations`, { page });
}

async function getMovieVideos(movieId: number): Promise<MovieVideos> {
  return fetchFromTMDB(`/movie/${movieId}/videos`);
}

async function getMovieImages(movieId: number): Promise<MovieImages> {
  return fetchFromTMDB(`/movie/${movieId}/images`);
}

async function getMovieReleaseDates(
  movieId: number
): Promise<MovieReleaseDates> {
  return fetchFromTMDB(`/movie/${movieId}/release_dates`);
}

// Export service functions
export default {
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
};
