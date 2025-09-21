import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
import { prisma } from "../config/db";
import { errorResponse } from "../utils/apiResponse";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json(errorResponse("Authorization header missing"));
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyJwt(token);

    const user = await prisma.user.findUnique({ where: { id: (payload as any).userId } });
    if (!user) {
      return res.status(401).json(errorResponse("Invalid token: user not found"));
    }

    req.user = { id: user.id, email: user.email };
    next();
  } catch (err) {
    return res.status(401).json(errorResponse("Invalid or expired token"));
  }
}
