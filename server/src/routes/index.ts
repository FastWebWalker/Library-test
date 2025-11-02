import { Express } from "express";
import healthRoutes from "./health.routes.js";
import bookRoutes from "./book.routes.js";

export function registerRoutes(app: Express) {
  app.use("/api", healthRoutes);
  app.use("/api/books", bookRoutes);
}

