import { Router } from "express";
import { getTasks, getTask, createTask, updateTask, deleteTask } from "../controllers/tasks.controller";
import { validator } from "../middleware/index";

const router = Router();

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", validator, createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;