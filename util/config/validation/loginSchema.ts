/** @format */
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "isRequired" }),
  password: z.string().min(1, { message: "isRequired" }),
});

// generate form types from zod validation schema
export type loginSchemaType = z.infer<typeof loginSchema>;
