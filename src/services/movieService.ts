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
async function fetchFromTMDB<T>(endpoint: string, params = { page }) {
  console.log(`page number`, params.page);
  const url = `https://api.themoviedb.org/3/movie/popular?page=${params.page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2VmYjlmYjRlMWYxZjg2OTE0ZmE4MjRiZjQ0MWU3YSIsIm5iZiI6MTczMTE3NzQxMS44MTIzMzk1LCJzdWIiOiI2NzI0ZmQzYjM0NDk0ODFiYWNhOWEwN2EiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.DxnZFI7uGTab3xsLXf_S0JepR8KY7Mls-aEh4E0kTkU",
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

async function getPopularMovies(page) {
  console.log(`GET POPULAR`, page);
  return fetchFromTMDB("/movie/popular", { page: page });
}

async function getMovieDetails(movieId: number): Promise<Movie> {
  return fetchFromTMDB(`/movie/${movieId}`);
}

async function searchMovies(query: string): Promise<TMDBResponse<Movie>> {
  return fetchFromTMDB("/search/movie", { query });
}

async function getMovieGenres(): Promise<{ genres: Genre[] }> {
  return fetchFromTMDB("/genre/movie/list");
}

async function getMovieCredits(movieId: number): Promise<MovieCredits> {
  return fetchFromTMDB(`/movie/${movieId}/credits`);
}

async function getSimilarMovies(movieId: number): Promise<TMDBResponse<Movie>> {
  return fetchFromTMDB(`/movie/${movieId}/similar`);
}

async function getMovieRecommendations(
  movieId: number
): Promise<TMDBResponse<MovieRecommendation>> {
  return fetchFromTMDB(`/movie/${movieId}/recommendations`);
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
