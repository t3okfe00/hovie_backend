export type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  profileUrl: string;
  createdAt: string;
};

export type CreateUserInput = {
  email: string;
  password: string;
  name: string;
  profileUrl: string;
};

export type Group = {
  id: number;
  name: string;
  description: string;
  ownersId: number;
  category: string;
  pictureUrl: string;
};

export interface CreateGroupInput {
  name: string;
  ownersId: number;
  category: string;
  description: string;
  pictureUrl: string;
}

export type IdGroupInput = {
  id: number;
};

export type UidIdGroupInput = {
  id: number;
  userId: number;
};

export type RemoveMemberInput = {
  id: number;
  userId: number;
  ownerId: number | null;
}

export type GroupContent = {
  id: number;
  timestamp: string | null;
  addedByUserId: number;
  groupsId: number;
  movieId: number;
}

export type CreateGroupContentInput = {
  addedByUserId: number;
  groupsId: number;
  movieId: number;
}

export type JoinGroupInput = {
  id: number;
  userId: number;
  ownerId: number;
};

export type AddMemberInput = {
    groupId: number;
    userId: number;
    role: string;
}

// Movie Type - Represents a movie object returned by TMDB API
export type Movie = {
  id: number;
  title: string;
  originalTitle: string;
  overview: string;
  releaseDate: string;
  genreIds: number[];
  genres: Genre[];
  runtime: number; // in minutes
  tagline: string;
  posterPath: string; // Image path, to be used with TMDB base URL
  backdropPath: string; // Image path, to be used with TMDB base URL
  voteAverage: number; // Rating out of 10
  voteCount: number;
  popularity: number; // Popularity score from TMDB
  adult: boolean; // True if the movie is for adults
};

// Genre Type - Represents a movie genre
export type Genre = {
  id: number;
  name: string;
};

// Movie Credits Type - Represents the cast and crew associated with a movie
export type MovieCredits = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};

// Cast Type - Represents an actor in the movie
export type Cast = {
  id: number;
  name: string;
  character: string;
  profilePath: string; // Image path for the actor
  gender: number; // 1 for female, 2 for male
  knownForDepartment: string; // e.g., acting, directing
  order: number; // Order of appearance in the credits
};

// Crew Type - Represents the crew member (director, writer, etc.)
export type Crew = {
  id: number;
  name: string;
  job: string;
  profilePath: string; // Image path for the crew member
};

// Movie Similar Movies Type - Represents similar movies to a given movie
export type SimilarMovies = {
  id: number;
  results: Movie[];
};

// Movie Recommendations Type - Represents movie recommendations for a given movie
export type MovieRecommendations = {
  id: number;
  results: Movie[];
};

// Movie Videos Type - Represents the videos associated with a movie (trailers, etc.)
export type MovieVideos = {
  id: number;
  results: Video[];
};

// Video Type - Represents a video (e.g., trailer, behind-the-scenes)
export type Video = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string; // e.g., YouTube
  size: number;
  type: string; // e.g., "Trailer"
};

// Movie Images Type - Represents the images (posters, backdrops) associated with a movie
export type MovieImages = {
  id: number;
  backdrops: Image[];
  posters: Image[];
};

// Image Type - Represents an image (either backdrop or poster)
export type Image = {
  filePath: string;
  width: number;
  height: number;
  aspectRatio: number;
  voteAverage: number;
  voteCount: number;
};

// Movie Release Dates Type - Represents movie release dates in different regions
export type MovieReleaseDates = {
  id: number;
  results: Release[];
};

// Release Type - Represents a release date for a movie in a region
export type Release = {
  iso_3166_1: string; // Country code (e.g., US, GB)
  releaseDates: ReleaseDate[];
};

// ReleaseDate Type - Represents a specific release date for a region
export type ReleaseDate = {
  certification: string; // Movie certification (e.g., "PG-13")
  releaseDate: string; // Release date in YYYY-MM-DD format
  type: number; // Release type (e.g., premiere, general release)
};

// Popular Movies Response Type - Represents the response when fetching popular movies
export type PopularMoviesResponse = {
  page: number;
  results: Movie[];
  totalPages: number;
  totalResults: number;
};

// Search Movies Response Type - Represents the response when searching for movies
export type SearchMoviesResponse = {
  page: number;
  results: Movie[];
  totalPages: number;
  totalResults: number;
};

// Movie Genres Response Type - Represents the genres available on TMDB
export type MovieGenresResponse = {
  genres: Genre[];
};

export type MovieRecommendation = {
  id: number;
  title: string;
  voteAverage: number;
};
