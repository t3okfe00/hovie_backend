import express, { NextFunction } from "express";
import { Request, Response } from "express";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import userRouter from "./routes/userRouter";
import morgan from "morgan";
const app = express();
const port = 3000;

import { absolutePath } from "swagger-ui-dist";
import ApiError from "./helpers/ApiError";
const pathToSwaggerUi = absolutePath();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "Automatically generated API documentation",
    },
  },
  apis: ["./routes/*.ts"], // Path to your route files
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve the Swagger UI at /docs

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(morgan("dev"));

app.use(express.static(pathToSwaggerUi));
app.use("/", userRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("asdsad!");
});

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode;
  res.status(statusCode).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`App started listening on port ${port}`);
});
