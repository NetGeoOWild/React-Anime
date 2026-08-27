import { z } from "zod";

export const forgetPasswordSchema = z.object({
  email: z.email({ error: "Invalid email" }).trim(),
});

export type ForgetPassData = z.infer<typeof forgetPasswordSchema>;
