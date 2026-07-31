import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .email("Email is invalid"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters"),
});