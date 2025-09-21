import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import * as authService from "./auth.service";
import { successResponse, errorResponse } from "../../utils/apiResponse";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
  firstName: z.string().min(1),
  lastName: z.string().min(1)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = registerSchema.parse(req.body);
    const data = await authService.registerUser(parsed);
    res.status(201).json(successResponse(data, "User registered"));
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = loginSchema.parse(req.body);
    const data = await authService.loginUser(parsed);
    res.status(200).json(successResponse(data, "Logged in"));
  } catch (err) {
    next(err);
  }
}
