import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),

  date: z
    .string()
    .min(1, "Date is required")
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: "Invalid date",
    }),

  owner: z.string().min(1, "Owner is required"),

  status: z.enum(["planned", "active", "done"]),

  description: z.string(),
});

export type EventFormSchema = z.infer<typeof eventSchema>;
