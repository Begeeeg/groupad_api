import { z } from "zod";

export const UpdateUserSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(30),
    password: z.string().min(1, "Password is required"),
});
