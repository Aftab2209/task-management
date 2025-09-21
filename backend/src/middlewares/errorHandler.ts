import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/apiResponse";
import { ZodError } from "zod";
import winston from "winston";

const logger = winston.createLogger({
  transports: [new winston.transports.Console()]
});

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error(err);

  if (err instanceof ZodError) {
    const formatted = err.flatten();
    return res.status(400).json(errorResponse("Validation error", formatted));
  }

  if (err.status && err.message) {
    return res.status(err.status).json(errorResponse(err.message, err.errors || null));
  }

  res.status(500).json(errorResponse("Internal Server Error"));
}
