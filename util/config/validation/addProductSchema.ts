/** @format */
import { z } from "zod";

const categorySchema = z.object({
  name: z.string(),
});

const SelectCodeSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

export const addProductSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: SelectCodeSchema,
  price: z.string(),
  imageUrl: z.object({ name: z.string().optional() }).optional(),
});

// generate form types from zod validation schema
export type addProductSchemaType = z.infer<typeof addProductSchema>;
