import { z } from "zod";

const userSchema = z
    .object({
        username: z.string().min(3, "username must be at least 3 characters"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // Error will be shown on the confirmPassword field
    });

export default userSchema;
