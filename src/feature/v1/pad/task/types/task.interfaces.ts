import { Types } from "mongoose";
import { taskStatus } from "./task.enums";

export interface ITask {
    userId: Types.ObjectId;
    listId: Types.ObjectId;
    title: string;
    description?: string;
    assignedTo?: Types.ObjectId;
    status: taskStatus;
    createdAt: Date;
    updatedAt: Date;
}
