import {Request, Response, NextFunction} from "express";

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
    } else if (!description) {
        res.status(400).json({ message: "Missing description" });
        return;
    }
    next();
};