import pool from "../db/client";

export async function getTasks() {
    const tasks = await pool.query("SELECT * FROM tasks");
    return tasks.rows;
}

export async function getTaskById(id: number){
    const task = await pool.query("SELECT * FROM todo WHERE task_id = $1", [id]);        
    return task.rows[0];
}

export async function createTask(title: string) {
    const newTask = await pool.query(
        "INSERT INTO tasks (title) VALUES($1) RETURNING *",
        [title]
    );
    return newTask.rows[0];
}

export async function updateTask(id: number, title: string, completed: boolean) {
    const updatedTask = await pool.query(
        `UPDATE tasks
        SET title = COALESCE($1, title),
            completed = COALESCE($2, completed)
        WHERE task_id = $3
        RETURNING *`, 
        [title, completed, id]
    );
    return updatedTask.rows[0];
} 

export async function deleteTask(id: number) {
    const deletedTask = await pool.query(
        "DELETE FROM tasks WHERE task_id = $1 RETURNING *", 
        [id]
    );
    return deletedTask.rows[0];
}