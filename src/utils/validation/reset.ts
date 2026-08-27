import { z } from "zod";

export const resetPassSchema = z.object({
  password: z
    .string()
    .min(6, { error: "Password must contain at least 6 characters" }),
});

export type ResetPassData = z.infer<typeof resetPassSchema>;
