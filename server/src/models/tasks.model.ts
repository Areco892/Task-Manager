import pool from "../db/client";

export async function getTasks(user_id: number) {
    const tasks = await pool.query(
        `SELECT tasks.task_id, tasks.title, tasks.completed, users.username 
        FROM tasks
        JOIN users ON tasks.user_id = users.user_id
        WHERE users.user_id = $1
        ORDER BY tasks.created_at DESC`,
        [user_id] 
    );
    return tasks.rows;
}

export async function getTaskById(task_id: number, user_id: number){
    const task = await pool.query(
        `SELECT tasks.task_id, tasks.title, tasks.completed, users.username 
        FROM tasks
        JOIN users ON tasks.user_id = users.user_id
        WHERE tasks.task_id = $1 AND tasks.user_id = $2`, 
        [task_id, user_id]
    );        
    return task.rows[0];
}

export async function createTask(title: string, user_id: number) {
    const newTask = await pool.query(
        `INSERT INTO tasks (title, user_id) VALUES($1, $2) RETURNING *`,
        [title, user_id]
    );
    return newTask.rows[0];
}

export async function updateTask(task_id: number, title: string, completed: boolean, user_id: number) {
    const updatedTask = await pool.query(
        `UPDATE tasks
        SET title = COALESCE($1, title),
            completed = COALESCE($2, completed),
        WHERE task_id = $3 AND user_id = $4
        RETURNING *`, 
        [title, completed, task_id, user_id]
    );
    return updatedTask.rows[0];
} 

export async function deleteTask(task_id: number, user_id: number) {
    const deletedTask = await pool.query(
        "DELETE FROM tasks WHERE task_id = $1 AND user_id = $2 RETURNING *", 
        [task_id, user_id]
    );
    return deletedTask.rows[0];
}