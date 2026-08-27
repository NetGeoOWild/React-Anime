import { z } from "zod"; // or 'zod/v4'

export const registerSchema = z.object({
  email: z.email({ error: "Invalid email" }).trim(),
  password: z
    .string()
    .min(6, { error: "Password must contain at least 6 characters" }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
