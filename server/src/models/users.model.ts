import pool from "../db/client";

export async function getUserById(user_id: number) { 
    const result = await pool.query(
        `SELECT * FROM users WHERE user_id = $1`,
        [user_id]
    );
    return result.rows[0];
};

export async function createUser(username: string, email: string, password: string) {
    const result = await pool.query(
        `INSERT INTO users (username, email, password)
        VALUES($1, $2, $3) RETURNING *`,
        [username, email, password]
    );
    return result.rows[0];
}