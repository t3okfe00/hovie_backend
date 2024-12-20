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



### Backend `.env` Example:

```
TEST_DATABASE_URL=supabase_db_url
DATABASE_URL=supabase_db_url
JWT_SECRET=your_secret
TMDB_API_KEY=YOUR_API_KEY_hERE

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

## Repo links
**Frontend:** [Frontend](https://github.com/AWAP-Group3/Frontend)
**Backend:** [Backend](https://github.com/AWAP-Group3/Backend)
**Link to project:** [Project](https://github.com/orgs/AWAP-Group3/projects/1/views/1)

## Database structure
![image](https://github.com/user-attachments/assets/fa1fa575-8917-41ce-b80f-5d24f674ba63)

## API Documentation
We used Swagger to document our API which is only running on localhost. Here are a few screenshots from the Swagger Page:
![Screenshot 2024-12-13 122648](https://github.com/user-attachments/assets/2b8f7363-aa7b-4f68-b598-89556276092c)
![Screenshot 2024-12-13 122705](https://github.com/user-attachments/assets/5fb2feb2-43c2-4e78-8bb1-e2a6913d9787)
![Screenshot 2024-12-13 122723](https://github.com/user-attachments/assets/bd4da665-87b6-4059-9a7e-213eab7cd53c)
Endpoints that dont require authentication can also be tried directly!

## UI
We created UI scetches with figma, so we exactly knew where everything should be later (when writing the code)
![Screenshot 2024-12-13 123140](https://github.com/user-attachments/assets/8e9897e7-bc9e-4df3-a748-58218ddaa13b)
![image](https://github.com/user-attachments/assets/21d9ea49-5965-4204-92b5-e5e890cb0f0f)

heres for example the groups Page and groups detail page:
![Screenshot 2024-12-13 124150](https://github.com/user-attachments/assets/c78cafd7-6d52-4593-82e4-c8e18bd926e7)
![image](https://github.com/user-attachments/assets/c3780d1d-1e5e-4255-83dc-43e14e69ed1b)


