import express from "express";
import cors from "cors";
import { logger, timer, routeNotFound, errorHandler} from "./middleware";
import taskRoutes from "./routes/tasks.routes";

const PORT = 5000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(timer);

// Routes
app.use("/tasks", taskRoutes);

// 404 - Route Not Found
app.use(routeNotFound);

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})