import { z } from "zod";

export const SignupUserSchema = z
    .object({
        username: z
            .string()
            .min(3, "Username must be at least 3 characters")
            .max(30),

        email: z.string().email("Invalid email address"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                "Password must contain at least one uppercase letter, one lowercase letter, and one number"
            ),

        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type SignupUserInput = z.infer<typeof SignupUserSchema>;
