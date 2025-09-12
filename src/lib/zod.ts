import * as z from "zod";

export const loginSchema = z.object({
    email: z.email("Please enter a valid email").refine((val) => val.trim().toLowerCase()),
    password: z.string().min(1, "Password is required"),
})


export const registerSchema = loginSchema.extend({
    name: z.string().min(1, "Name is required").refine((val) => val.trim()),
    confirmPassword: z
        .string()
        .min(6, "Confirm Password must be at least 6 characters"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).*$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});


export type RegisterFormInputs = z.infer<typeof registerSchema>;
export type LoginFormInputs = z.infer<typeof loginSchema>;