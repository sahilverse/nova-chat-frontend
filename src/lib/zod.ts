import * as z from "zod";

export const loginSchema = z.object({
    email: z.email("Please enter a valid email").transform((val) => val.trim().toLowerCase()),
    password: z.string().min(1, "Password is required"),
})


export const registerSchema = loginSchema.extend({
    name: z.string().min(1, "Name is required").transform((val) => val.trim()),
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


export const forgotPasswordSchema = z.object({
    email: z.email("Please enter a valid email address"),
})


export const resetPasswordSchema = z.object({
    newPassword: z
        .string()
        .min(6, "New Password must be at least 6 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).*$/,
            "New Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
    confirmNewPassword: z
        .string()
        .min(6, "Confirm New Password must be at least 6 characters"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
})



export type RegisterFormInputs = z.infer<typeof registerSchema>;
export type LoginFormInputs = z.infer<typeof loginSchema>;
export type ForgotPasswordFormInputs = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormInputs = z.infer<typeof resetPasswordSchema>;