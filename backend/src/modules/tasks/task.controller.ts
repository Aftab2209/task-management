import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import * as taskService from "./task.service";
import { AuthRequest } from "../../middlewares/authMiddleware";
import { successResponse } from "../../utils/apiResponse";

const createSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  priority: z.enum(["HIGH","MEDIUM","LOW"]).optional(),
  category: z.enum(["WORK","PERSONAL","SHOPPING","OTHER"]).optional(),
  dueDate: z.string().optional()
});

const updateSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  priority: z.enum(["HIGH","MEDIUM","LOW"]).optional(),
  category: z.enum(["WORK","PERSONAL","SHOPPING","OTHER"]).optional(),
  status: z.enum(["PENDING","IN_PROGRESS","COMPLETED"]).optional(),
  dueDate: z.union([z.string(), z.null()]).optional()
});

export async function createTask(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.id;
    const dto = createSchema.parse(req.body);
    const task = await taskService.createTask(userId, dto);
    res.status(201).json(successResponse(task, "Task created"));
  } catch (err) {
    next(err);
  }
}

export async function getTasks(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.id;
    const filters = req.query;
    const data = await taskService.getTasks(userId, filters);
    res.json(successResponse(data));
  } catch (err) {
    next(err);
  }
}

export async function getTask(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.id;
    const id = req.params.id;
    const task = await taskService.getTaskById(userId, id);
    if (!task) return res.status(404).json(successResponse(null, "Task not found"));
    res.json(successResponse(task));
  } catch (err) {
    next(err);
  }
}

export async function updateTask(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.id;
    const id = req.params.id;
    const dto = updateSchema.parse(req.body);
    const result = await taskService.updateTask(userId, id, dto);
    if (result.count === 0) {
      return res.status(404).json(successResponse(null, "Task not found or no changes"));
    }
    res.json(successResponse({ updated: result.count }, "Task updated"));
  } catch (err) {
    next(err);
  }
}

export async function deleteTask(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.id;
    const id = req.params.id;
    const result = await taskService.deleteTask(userId, id);
    if (result.count === 0) {
      return res.status(404).json(successResponse(null, "Task not found"));
    }
    res.json(successResponse({ deleted: result.count }, "Task deleted"));
  } catch (err) {
    next(err);
  }
}

export async function getStats(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user!.id;
    const stats = await taskService.getStats(userId);
    res.json(successResponse(stats));
  } catch (err) {
    next(err);
  }
}
