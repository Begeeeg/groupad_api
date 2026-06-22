import { z } from "zod";
import { taskStatus } from "../types/task.enums";

export const updateTaskSchema = z.object({
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().optional(),
    status: z.nativeEnum(taskStatus).optional(),
    assignedTo: z.array(z.string()).optional(),
});

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
