import type { Express } from "express";
import { config } from "../config/index";
import exampleRoutes from "./exampleRoutes";
import notificationRoutes from "./notificationRoutes";

export function registerRoutes(app: Express): void {
  const prefix = config.apiPrefix;

  app.get("/", (_req, res) => {
    res.json({
      message: "Backend API",
      docs: {
        examples: `${prefix}/examples`,
        notifications: `${prefix}/notifications`,
      },
      health: "/health",
    });
  });

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.use(`${prefix}/examples`, exampleRoutes);
  app.use(`${prefix}/notifications`, notificationRoutes);
}
