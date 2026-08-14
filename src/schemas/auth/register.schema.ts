import { z } from "zod";

export const registerSchema = z.object({
    email: z.email("Please enter a valid email address"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain an uppercase letter")
        .regex(/[a-z]/, "Password must contain a lowercase letter")
        .regex(/\d/, "Password must contain a number")
        .regex(
            /[^A-Za-z\d]/,
            "Password must contain a symbol",
        ),
});

export type RegisterFormValues =
    z.infer<typeof registerSchema>;