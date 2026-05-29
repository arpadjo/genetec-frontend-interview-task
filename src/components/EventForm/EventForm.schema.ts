import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),

  date: z
    .string()
    .min(1, "Date is required")
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: "Invalid date",
    }),
});

export type EventFormSchema = z.infer<typeof eventSchema>;
