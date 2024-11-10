import { Genre, Movie, MovieCredits, MovieImages, MovieReleaseDates, MovieVideos,MovieRecommendation } from "../types";

// services/movieService.js
const axios = require('axios');
// import axios from 'axios';

const API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';

// TMDB Response Shape (generic)
type TMDBResponse<T> = {
    page: number;
    results: T[];
    totalPages: number;
    totalResults: number;
  };

// Utility function to fetch data from TMDB API
async function fetchFromTMDB<T>(endpoint: string, params = {}): Promise<T> {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: {
        api_key: API_KEY,
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from TMDB: ${error}`);
    throw error;
  }
}

// Service functions with appropriate types

async function getPopularMovies(): Promise<TMDBResponse<Movie>> {
  return fetchFromTMDB('/movie/popular');
}

async function getMovieDetails(movieId: number): Promise<Movie> {
  return fetchFromTMDB(`/movie/${movieId}`);
}

async function searchMovies(query: string): Promise<TMDBResponse<Movie>> {
  return fetchFromTMDB('/search/movie', { query });
}

async function getMovieGenres(): Promise<{ genres: Genre[] }> {
  return fetchFromTMDB('/genre/movie/list');
}

async function getMovieCredits(movieId: number): Promise<MovieCredits> {
  return fetchFromTMDB(`/movie/${movieId}/credits`);
}

async function getSimilarMovies(movieId: number): Promise<TMDBResponse<Movie>> {
  return fetchFromTMDB(`/movie/${movieId}/similar`);
}

async function getMovieRecommendations(movieId: number): Promise<TMDBResponse<MovieRecommendation>> {
  return fetchFromTMDB(`/movie/${movieId}/recommendations`);
}

async function getMovieVideos(movieId: number): Promise<MovieVideos> {
  return fetchFromTMDB(`/movie/${movieId}/videos`);
}

async function getMovieImages(movieId: number): Promise<MovieImages> {
  return fetchFromTMDB(`/movie/${movieId}/images`);
}

async function getMovieReleaseDates(movieId: number): Promise<MovieReleaseDates> {
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