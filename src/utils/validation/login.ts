import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Invalid email" }).trim(),
  password: z
    .string()
    .min(6, { error: "Password must contain at least 6 characters" }),
});

export type LogInFormData = z.infer<typeof loginSchema>;
