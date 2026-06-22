import { taskStatus } from "./task.enums";

export interface CreateTaskData {
    userId: string;
    listId: string;
    title: string;
    description?: string;
    status?: taskStatus;
    assignedTo?: string[];
}

export interface UpdateTaskData {
    userId: string;
    taskId: string;
    title?: string;
    description?: string;
    status?: taskStatus;
    assignedTo?: string[];
}

export interface GetTaskData {
    userId: string;
    listId: string;
}
