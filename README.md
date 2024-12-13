# Hovie - Stream Your Next Adventure

## Movies at Your Fingertips

Hovie is a web platform for movie enthusiasts, offering movie searches, reviews, showtimes, and group discussions using TMDB and FINNKINO APIs. Users can manage favorites, write reviews, and connect with friends through a modern, interactive interface.

---

## Features

- **Search and view movies**: Detailed information about movies.
- **Real-time showtimes**: Fetch movie schedules from FINNKINO.
- **Groups and discussions**: Create and manage user groups for discussions.
- **Favorites and reviews**: Save your favorite movies and share your opinions.
- **Account management**: Create an account to unlock additional features.

---

## Technologies Used

**Frontend:** React, Vite, Tailwind CSS**Backend:** Node.js, Express, Drizzle ORM**Database:** PostgreSQL**APIs:** TMDB, FINNKINO

---

## Project Architecture

Hovie follows the **MVC (Model-View-Controller)** architecture:

- **Model**: Represents database entities like Users, Movies, Reviews, Groups, and Showtimes using Drizzle ORM and PostgreSQL.
- **View**: React-powered frontend with responsive styling via Tailwind CSS.
- **Controller**: Express backend for API requests, routes, and business logic.

---

## Team Members

- **Efe Okyar**: Frontend & Backend
- **Iniobong Equere**: Wireframes & Frontend
- **Lukas Pfister**: Frontend & Backend
- **Afsaneh Heidari**: Frontend & Backend

---

## Installation

1. Clone the repository from GitHub.
2. Set up `.env` files for both frontend and backend.

### Frontend `.env` Example:

```
TEST_DATABASE_URL=postgresql://postgres.zkpvgqjpkgenzjqmfdqc:AWAP-Group3!@aws-0-eu-central-1.pooler.supabase.com:5432/postgres
DATABASE_URL=postgresql://postgres.ijpqdqfaxpkihaiptywq:AWAP-Group3!@aws-0-eu-central-1.pooler.supabase.com:5432/postgres
TMDB_API_KEY=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2VmYjlmYjRlMWYxZjg2OTE0ZmE4MjRiZjQ0MWU3YSIsIm5iZiI6MTczMTMzOTcyMC4wOTI2MDQ2LCJzdWIiOiI2NzI0ZmQzYjM0NDk0ODFiYWNhOWEwN2EiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-tOiZRkFwropLnevXIVl4wUiXXUcfsf5AIpVI15oPEk
VITE_TMDB_API_KEY=fcefb9fb4e1f1f86914fa824bf441e7a
JWT_SECRET=e0463605e3627348465e4aa84c5d6d7a9c09557921d2d0ac35aeeebf95b8e4a5
VITE_BACKEND_BASE_URL=http://localhost:3000
VITE_MOVIE_ENDPOINT_BASE_URL=http://localhost:3000/movie
VITE_BASE_IMAGE_URL=https://image.tmdb.org/t/p/
VITE_ORIGINAL_IMAGE_URL=https://image.tmdb.org/t/p/original
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
```

### Backend `.env` Example:

```
TEST_DATABASE_URL=postgresql://postgres.zkpvgqjpkgenzjqmfdqc:AWAP-Group3!@aws-0-eu-central-1.pooler.supabase.com:5432/postgres
DATABASE_URL=postgresql://postgres.ijpqdqfaxpkihaiptywq:AWAP-Group3!@aws-0-eu-central-1.pooler.supabase.com:5432/postgres
JWT_SECRET=9ed9b94eb4aa1d1ea225deec7763c3f84f1bf5f21a26e80755a2a19895d901f4
TMDB_API_KEY=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2VmYjlmYjRlMWYxZjg2OTE0ZmE4MjRiZjQ0MWU3YSIsIm5iZiI6MTczMTMzOTcyMC4wOTI2MDQ2LCJzdWIiOiI2NzI0ZmQzYjM0NDk0ODFiYWNhOWEwN2EiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-tOiZRkFwropLnevXIVl4wUiXXUcfsf5AIpVI15oPEk
```

3. Install dependencies and start the backend:

```
npm install && npm run dev:server
```

4. Install dependencies and start the frontend:

```
npm install && npm run dev
```

---

## API Documentation

**Swagger UI** is used for documenting the API:

- **Base URL:** `http://localhost:3000/docs` (or the deployed backend URL with `/docs`)
- **Interactive API Documentation:** Explore endpoints, parameters, and responses.
- **OpenAPI Specification:** Consistent, machine-readable API definitions.
- **Built-in Testing:** Execute requests and view responses directly in the browser.

---

## Live Demo

- **Frontend:** [Hovie Frontend](https://awapgroup3front.onrender.com/)
- **Backend:** [Hovie Backend](https://awapgroup3.onrender.com/)

## Link to the Video
- **Video:** [Video](https://youtu.be/3uQLG5qtcdU)
