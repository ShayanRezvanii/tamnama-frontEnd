/** @format */
import { z } from "zod";

const categorySchema = z.object({
  name: z.string(),
});

const SelectCodeSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

export const addProfileSchema = z.object({
  firstColor: z.string().min(1),
  secondColor: z.string(),
  phone: z.string(),
  workTime: z
    .object({
      from: SelectCodeSchema,
      to: SelectCodeSchema,
    })
    .refine(
      (data) => {
        const { from, to } = data;
        const timeToMinutes = (time: any) => {
          const [hours, minutes] = time.split(":").map(Number);
          return hours * 60 + minutes;
        };

        const fromMinutes = timeToMinutes(from.value);
        const toMinutes = timeToMinutes(to.value);

        return toMinutes > fromMinutes;
      },
      {
        message: "تایم پایان نمیتواند قبل از شروع باشد",
        path: ["to"],
      }
    ),
  imageUrl: z.object({ name: z.string().optional() }).optional(),
});

// generate form types from zod validation schema
export type addProfileSchemaType = z.infer<typeof addProfileSchema>;
