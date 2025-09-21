import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import authRoutes from "./modules/auth/auth.routes";
import taskRoutes from "./modules/tasks/task.routes";
import { errorHandler } from "./middlewares/errorHandler";
import { authMiddleware, AuthRequest } from "./middlewares/authMiddleware";
import { env } from "./config/env";
import { AuthResponse } from "modules/auth/auth.types";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(morgan("combined"));

app.use(
  rateLimit({
    windowMs: 60 * 1000,  
    max: 120
  })
);

 
app.use("/api/auth", authRoutes);

 
app.use("/api/tasks", authMiddleware, taskRoutes);
app.get("/api/auth/profile", authMiddleware, (req : AuthRequest, res) => {
  res.json({ success: true, data: req.user });
});

 
app.get("/health", (req, res) => res.json({ status: "ok" }));

 
app.use(errorHandler);
