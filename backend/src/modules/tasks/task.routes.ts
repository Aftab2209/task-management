import { Router } from "express";
import * as controller from "./task.controller";

const router = Router();

router.get("/", controller.getTasks);
router.post("/", controller.createTask);
router.get("/stats", controller.getStats);
router.get("/:id", controller.getTask);
router.put("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);

export default router;
