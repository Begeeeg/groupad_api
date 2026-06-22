import { z } from "zod";
import { listType } from "../types/list.enums";

export const UpdateListSchema = z.object({
    title: z.string().min(1, "Title is required").optional(),

    type: z.nativeEnum(listType).optional(),

    members: z.array(z.string()).optional(),

    dueDate: z.coerce.date().optional(),
});

export type UpdateListInput = z.infer<typeof UpdateListSchema>;
