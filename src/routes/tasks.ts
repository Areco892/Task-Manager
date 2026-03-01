import { Router, Request, Response, NextFunction} from "express";
import { AppError } from "../errors/AppError";
import { validator } from "../middleware";
import { Task } from "../types";

const router = Router();

/* In-memory tasks */
let tasks = [
    {id: 1, title: "Clean the room", description: "Wipe the desk", completed: true},
    {id: 2, title: "Brush my teeth", description: "Brush my teeth", completed: false},
    {id: 3, title: "Task Manager", description: "Complete the first version of the task manager app", completed: false},
]

/* Routes */
router.get("/tasks", (req: Request, res: Response, next: NextFunction) => {
    try {
        const completed = req.query.completed as string;
        if (completed === "true") {
            const completedTasks = tasks.filter(task => task.completed);
            res.status(200).json({ tasks: completedTasks});
        } else {
            res.status(200).json({ tasks: tasks });
        }
    } catch (error) {
        console.error(error);
        next(new AppError(500, "Something went wrong"));
    }
});

router.get("/tasks/:id", (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string);
        const task = tasks.find(task => task.id === id);

        if (!task) {
            next(new AppError(404, "Task Not Found"));
            return;
        }
        res.status(200).json({ task: task});
    } catch (error) {
        console.error(error);
        next(new AppError(500, "Something went wrong"));
    }
});

router.post("/tasks", validator, (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description } = req.body;
        const newTask = {
            id: tasks.length + 1,
            title: title,
            description: description,
            completed: false
        }
        tasks.push(newTask);
        res.status(201).json({ task: newTask });    
    } catch (error) {
        console.error(error);
        next(new AppError(500, "Something went wrong"));
    }
});

router.patch("/tasks/:id", (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string);
        const task = tasks.find(task => task.id === id);

        if (!task) {
            next(new AppError(404, "Task Not Found"));
            return;
        }
        task.completed = !task.completed;
        res.status(200).json({ task });
    } catch (error) {
        console.error(error);
        next(new AppError(500, "Something went wrong"));
    }
});

router.delete("/tasks/:id", (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = parseInt(req.params.id as string);
        const index = tasks.findIndex(task => task.id === id);

        if (index === -1) {
            next(new AppError(404, "Task Not Found"));
            return;
        }
        tasks.splice(index, 1);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        next(new AppError(500, "Something went wrong"));
    }
});

export default router;