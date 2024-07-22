/** @format */
import { z } from "zod";

const SelectCodeSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});
export const addCategorySchema = z.object({
  categories: z.string(),
  Icon: SelectCodeSchema,
});

// generate form types from zod validation schema
export type addCategorySchemaType = z.infer<typeof addCategorySchema>;
