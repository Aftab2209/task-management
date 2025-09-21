import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middlewares/authMiddleware";
import { prisma } from "../../config/db";
import { successResponse } from "../../utils/apiResponse";

export async function getProfile(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, firstName: true, lastName: true, createdAt: true, updatedAt: true }
    });

    res.json(successResponse(user));
  } catch (err) {
    next(err);
  }
}
