import express, { NextFunction, Request, Response } from "express";
import { logger, timer } from "./middleware";
import { AppError } from "./errors/AppError";
import taskRoutes from "./routes/tasks";
 
const PORT = 3000;
const app = express();

/* Middleware */
app.use(express.json());
app.use(logger);
app.use(timer);

/* Routes */
app.use("/tasks", taskRoutes);

// 404 - Route Not Found
const routeNotFound = (req: Request, res: Response) => {
    res.status(404).json({ message: "Route Not Found" });
};
app.use(routeNotFound);

// Error Handler
const errorHandler = (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = (err as AppError).statusCode || 500;
    console.error(`[ERROR] ${err.message}`);
    res.status(statusCode).json({ message: err.message });
};
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})