import { z } from "zod";
import { listType } from "../types/list.enums";

export const CreateListSchema = z.object({
    title: z.string().min(1, "Title is required"),

    type: z.nativeEnum(listType),

    members: z.array(z.string()).optional(),

    dueDate: z.coerce.date(),
});

export type CreateListInput = z.infer<typeof CreateListSchema>;
