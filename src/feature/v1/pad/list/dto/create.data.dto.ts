import { z } from "zod";
import { listType } from "../types/list.enums";

export const CreateListSchema = z.object({
    title: z.string().min(1, "Title is required"),

    type: z.nativeEnum(listType),

    members: z.array(z.string()).optional(),

    dueDate: z.coerce.date().refine(
        (date) => {
            const today = new Date();

            // Normalize both dates to midnight
            today.setHours(0, 0, 0, 0);

            const dueDate = new Date(date);
            dueDate.setHours(0, 0, 0, 0);

            return dueDate >= today;
        },
        {
            message: "Due date cannot be in the past",
        }
    ),
});

export type CreateListInput = z.infer<typeof CreateListSchema>;
