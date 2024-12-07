import swaggerJSDoc from "swagger-jsdoc";

export const configureSwagger = () => {
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Movie & Group API",
        description:
          "API documentation for managing movies, groups, and users.",
        version: "1.0.0",
        contact: {
          name: "Afsaneh Heidari",
          email: "t3heaf00@students.oamk",
        },
      },
      servers: [
        {
          url: "http://localhost:3000/",
          description: "Local Development Server",
        },
      ],
    },
    apis: ["./src/routes/*.ts"],
  };

  return swaggerJSDoc(swaggerOptions);
};
