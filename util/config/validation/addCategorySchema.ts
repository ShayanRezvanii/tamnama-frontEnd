/** @format */
import { z } from "zod";

const categorySchema = z.object({
  name: z.string(),
});
export const addCategorySchema = z.object({
  categories: z.string(),
});

// generate form types from zod validation schema
export type addCategorySchemaType = z.infer<typeof addCategorySchema>;
