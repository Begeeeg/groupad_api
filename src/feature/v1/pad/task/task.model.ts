import { model, Schema } from "mongoose";
import { ITask } from "./types/task.interfaces";
import { taskStatus } from "./types/task.enums";

const TaskSchema = new Schema<ITask>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        listId: {
            type: Schema.Types.ObjectId,
            ref: "List",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: "",
        },
        assignedTo: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        status: {
            type: String,
            enum: Object.values(taskStatus),
            default: taskStatus.Pending,
        },
    },
    { timestamps: true }
);

const TaskModel = model<ITask>("Task", TaskSchema);

export default TaskModel;
