import { serve, setup } from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

// Swagger options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie & Group API",
      description:
        "APIs to fetch movie data, including popular movies, details, genres, credits, and more from The Movie Database (TMDb). Also provides functionality for managing groups, memberships, and content.",
      version: "1.0.0",
      contact: {
        name: "Afsaneh Heidari",
        email: "t3heaf00@students.oamk",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local Development Server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Add this line to specify your API route files
  paths: {
    "/": {
      get: {
        summary: "Welcome route",
        description:
          "Returns a simple welcome message to the authenticated user.",
        operationId: "getWelcomeMessage",
        security: [
          {
            BearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "A welcome message to the authenticated user.",
            content: {
              "application/json": {
                schema: {
                  type: "string",
                  example: "Welcome to the route!",
                },
              },
            },
          },
          401: {
            description: "Unauthorized, if JWT token is missing or invalid.",
          },
        },
      },
    },
    "/login": {
      post: {
        summary: "User login",
        description: "Logs in a user by validating credentials.",
        operationId: "loginUser",
        requestBody: {
          description: "User login details",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "User logged in successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: { type: "string" },
                  },
                },
              },
            },
          },
          400: {
            description: "Invalid credentials.",
          },
        },
      },
    },
    "/signup": {
      post: {
        summary: "User signup",
        description: "Registers a new user.",
        operationId: "signUpUser",
        requestBody: {
          description: "New user details for sign up.",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                  name: { type: "string" },
                },
                required: ["email", "password", "name"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "User created successfully.",
          },
          400: {
            description: "Bad request, invalid input.",
          },
        },
      },
    },
    "/logout": {
      get: {
        summary: "Log out user",
        description: "Logs out the current user by clearing the JWT token.",
        operationId: "logOutUser",
        responses: {
          200: {
            description: "User logged out successfully.",
          },
          400: {
            description: "Logout failed.",
          },
        },
      },
    },
    "/{userId}": {
      delete: {
        summary: "Delete user",
        description: "Deletes a user by their user ID.",
        operationId: "deleteUser",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            description: "The ID of the user to delete.",
            schema: {
              type: "string",
            },
          },
        ],
        security: [
          {
            BearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully.",
          },
          401: {
            description: "Unauthorized, if JWT token is missing or invalid.",
          },
          404: {
            description: "User not found.",
          },
        },
      },
    },

    // Movie API Routes
    "/movie/popular": {
      get: {
        summary: "Retrieve popular movies",
        operationId: "getPopularMovies",
        responses: {
          200: {
            description: "List of popular movies",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Movie",
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/movie/{id}": {
      get: {
        summary: "Retrieve movie details by ID",
        operationId: "getMovieDetails",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "The ID of the movie",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "Movie details",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MovieDetails",
                },
              },
            },
          },
          404: {
            description: "Movie not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },

    // Group API Routes
    "/groups": {
      get: {
        summary: "Get all groups",
        operationId: "getGroups",
        responses: {
          200: {
            description: "List of all groups",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Group",
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error",
          },
        },
      },
      post: {
        summary: "Create a new group",
        operationId: "createGroup",
        responses: {
          201: {
            description: "Group created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Group",
                },
              },
            },
          },
          400: {
            description: "Invalid data provided",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      // Group Related Schemas
      User: {
        type: "object",
        properties: {
          id: { type: "integer" },
          email: { type: "string" },
          password: { type: "string" },
          name: { type: "string" },
          profileUrl: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      Group: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
          ownersId: { type: "integer" },
        },
      },
      Movie: {
        type: "object",
        properties: {
          id: { type: "integer" },
          title: { type: "string" },
          originalTitle: { type: "string" },
          overview: { type: "string" },
          releaseDate: { type: "string", format: "date" },
          genreIds: { type: "array", items: { type: "integer" } },
          genres: {
            type: "array",
            items: { $ref: "#/components/schemas/Genre" },
          },
          runtime: { type: "integer" },
          tagline: { type: "string" },
          posterPath: { type: "string" },
          backdropPath: { type: "string" },
          voteAverage: { type: "number", format: "float" },
          voteCount: { type: "integer" },
          popularity: { type: "number", format: "float" },
          adult: { type: "boolean" },
        },
      },
      MovieDetails: {
        type: "object",
        properties: {
          id: { type: "integer" },
          title: { type: "string" },
          originalTitle: { type: "string" },
          overview: { type: "string" },
          releaseDate: { type: "string", format: "date" },
          genres: {
            type: "array",
            items: { $ref: "#/components/schemas/Genre" },
          },
          runtime: { type: "integer" },
          tagline: { type: "string" },
          posterPath: { type: "string" },
          backdropPath: { type: "string" },
          voteAverage: { type: "number", format: "float" },
          voteCount: { type: "integer" },
          popularity: { type: "number", format: "float" },
          adult: { type: "boolean" },
          credits: {
            type: "object",
            properties: {
              cast: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/CastMember",
                },
              },
              crew: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/CrewMember",
                },
              },
            },
          },
        },
      },
      Genre: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
        },
      },
      CastMember: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
          character: { type: "string" },
          profilePath: { type: "string" },
        },
      },
      CrewMember: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
          job: { type: "string" },
          profilePath: { type: "string" },
        },
      },
    },
  },
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", serve, setup(specs));
