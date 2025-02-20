import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

// Swagger options
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Captured API",
      version: "1.0.0",
      description: "API documentation for Captured project",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local development server",
      },
    ],
  },
  apis: ["./src/docs/*.ts"], // Diretório central de documentação
};

// Generate Swagger specification
const swaggerSpec = swaggerJsdoc(options);

// Function to setup Swagger in Express
/**
 *
 * @param app
 */
export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(
    "📄 Swagger documentation available at http://localhost:3000/api-docs",
  );
}
