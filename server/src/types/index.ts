export interface User {
    user_id: number;
    username: string;
    email: string;
    password: string;
    created_at: Date;
}

export interface Task {
    task_id: number;
    title: string;
    completed: boolean;
    user_id: number;
    created_at: Date;
}