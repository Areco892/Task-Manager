import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import * as TaskService from "../services/tasks.service";

const TEMP_USER_ID = 1;

export async function getTasks(req: Request, res: Response, next: NextFunction) {
    try{
        const tasks = await TaskService.getTasksService(TEMP_USER_ID);
        res.status(200).json(tasks);
    } catch(err) {
        console.error(err);
        next(new AppError(500, "Server error"));
    }
}

export async function getTask(req: Request, res: Response, next: NextFunction) {
    try{
        const id = parseInt(req.params.id as string);
        if (isNaN(id)) {
            next(new AppError(400, "Invalid ID"));
            return;
        }

        const task = await TaskService.getTaskByIdService(id, TEMP_USER_ID);
        if (!task) {
            next(new AppError(404, "Task Not Found"));
            return;
        }
        res.status(200).json(task);
    } catch(err) {
        console.error(err);
        next(new AppError(500, "Server error"));
    }
}

export async function createTask(req: Request, res: Response, next: NextFunction) {
    try {
        const { title } = req.body;
        const newTask = await TaskService.createTaskService(title, TEMP_USER_ID);
        res.status(201).json({ message: "Task Created", task: newTask });
    } catch (error) {
        console.error(error);
        next(new AppError(500, "Server error"));
    }
}

export async function updateTask(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id as string);
        if (isNaN(id)) {
            next(new AppError(400, "Invalid ID"));
            return;
        }

        const { title, completed } = req.body;
        const updatedTask = await TaskService.updateTaskService(id, title, completed, TEMP_USER_ID);
        if (!updatedTask) {
            next(new AppError(404, "Task Not Found"));
            return;
        }
        
        res.status(200).json({ message: "Task Updated", task: updatedTask });
    } catch (err) {
        console.error(err);
        next(new AppError(500, "Server error"));
    }
}

export async function deleteTask(req: Request, res: Response, next: NextFunction) {
    try{
        const id = parseInt(req.params.id as string);
        if (isNaN(id)) {
            next(new AppError(400, "Invalid ID"));
            return;
        }

        const deletedTask = await TaskService.deleteTaskService(id, TEMP_USER_ID);
        if (!deletedTask) {
            next(new AppError(404, "Task Not Found"));
            return;
        }
        res.status(200).json({ message: "Task Deleted", task: deletedTask });
    } catch(err) {
        console.error(err);
        next(new AppError(500, "Server error"));
    }
}