import * as z from "zod";

export const loginSchema = z.object({
    email: z.email("Please enter a valid email").refine((val) => val.trim().toLowerCase()),
    password: z.string().min(1, "Password is required"),
})