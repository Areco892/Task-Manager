import * as TasksModel from "../models/tasks.model";

export async function getTasksService() {
    return await TasksModel.getTasks();
}

export async function getTaskByIdService(id: number) {
    return await TasksModel.getTaskById(id);
}

export async function createTaskService(title: string) {
    return await TasksModel.createTask(title);
}

export async function updateTaskService(id: number, title: string, completed: boolean) {
    return await TasksModel.updateTask(id, title, completed);
}

export async function deleteTaskService(id: number) {
    return await TasksModel.deleteTask(id);
}