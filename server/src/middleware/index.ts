import {Request, Response, NextFunction} from "express";
import { AppError } from "../errors/AppError";

// Request logger
export const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
};

// Request Timer
export const timer = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    res.on("finish", () => {
        console.log(`${Date.now() - startTime} milliseconds`);
    });
    next();
};

// Validator - POST only
export const validator = (req: Request, res: Response, next: NextFunction) => {
    const { title, description } = req.body;
    if (!title) {
        res.status(400).json({ message: "Missing title" });
        return;
    }
    next();
};

// Route Not Found
export const routeNotFound = (req: Request, res: Response) => {
    res.status(404).json({ message: "Route Not Found" });
};

// Error Handler
export const errorHandler = (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = (err as AppError).statusCode || 500;
    console.error(`[ERROR] ${err.message}`);
    res.status(statusCode).json({ message: err.message });
};