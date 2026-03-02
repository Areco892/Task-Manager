import * as TasksModel from "../models/tasks.model";

export async function getTasksService(user_id: number) {
    return await TasksModel.getTasks(user_id);
}

export async function getTaskByIdService(task_id: number, user_id: number) {
    return await TasksModel.getTaskById(task_id, user_id);
}

export async function createTaskService(title: string, user_id: number) {
    return await TasksModel.createTask(title, user_id);
}

export async function updateTaskService(task_id: number, title: string, completed: boolean, user_id: number) {
    return await TasksModel.updateTask(task_id, title, completed, user_id);
}

export async function deleteTaskService(task_id: number, user_id: number) {
    return await TasksModel.deleteTask(task_id, user_id);
}