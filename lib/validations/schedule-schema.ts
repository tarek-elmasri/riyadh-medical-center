import * as z from "zod";

export const scheduleSchema = z.object({
  label: z.string().min(1, { message: "حقل مطلوب" }),
});

export type ScheduleFormType = z.infer<typeof scheduleSchema>;
