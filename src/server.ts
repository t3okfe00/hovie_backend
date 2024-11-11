// import express, { NextFunction } from "express";
// import cookieParser from "cookie-parser";
// import helmet from "helmet";
// import { Request, Response } from "express";
// import cors from 'cors';

// import swaggerJSDoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";
// import userRouter from "./routes/userRouter";
// import groupRouter from "./routes/groupRouter";
// import movieRouter from "./routes/movieRouter";

// import morgan from "morgan";
// const app = express();
// // Use CORS middleware
// app.use(cors());
// const port = 3000;

// import { absolutePath } from "swagger-ui-dist";
// import ApiError from "./helpers/ApiError";

// const pathToSwaggerUi = absolutePath();

// const swaggerOptions = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "My API",
//       version: "1.0.0",
//       description: "Automatically generated API documentation",
//     },
//   },
//   apis: ["./routes/*.ts"], // Path to your route files
// };

// const swaggerSpec = swaggerJSDoc(swaggerOptions);

// // Serve the Swagger UI at /docs

// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.use(morgan("dev"));
// app.use(express.json());
// app.use(helmet());
// app.use(cookieParser());

// app.use(express.static(pathToSwaggerUi));
// app.use("/user", userRouter);
// app.use("/", groupRouter);
// app.use('/movie', movieRouter);

// // to handle requests to the endpoints that does not exist
// //important to place this after all routes since if this runs
// //it means there is no route matched and we return 404
// app.use((req: Request, res: Response, next: NextFunction) => {
//   const err = new ApiError("Route Not Found", 404);
//   next(err); // Pass the error to the error-handling middleware
// });

// app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
//   const statusCode = err.statusCode || 500;
//   res.status(statusCode).json({ error: err.message });
// });

// app.listen(port, () => {
//   console.log(`App started listening on port ${port}`);
// });

import express, { NextFunction, Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import userRouter from "./routes/userRouter";
import groupRouter from "./routes/groupRouter";
import movieRouter from "./routes/movieRouter";

const app = express();
const port = 3000;

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // OpenAPI 3.0 specification
    info: {
      title: "My API",
      version: "1.0.0",
      description: "Automatically generated API documentation",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Local development server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Ensure this points to the correct location of your route files
};

// Generate Swagger spec
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger UI at /docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve the Swagger JSON at /swagger.json
app.get("/swagger.json", (req: Request, res: Response) => {
  res.json(swaggerSpec); // This should serve the Swagger JSON
});

// Middleware setup
app.use(morgan("dev"));
app.use(express.json());

// Register API routes
app.use("/user", userRouter);
app.use("/group", groupRouter);
app.use("/movie", movieRouter);

// Start server
app.listen(port, () => {
  console.log(`App started listening on port ${port}`);
});
