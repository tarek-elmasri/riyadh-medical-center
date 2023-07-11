import * as z from "zod";

export const doctorSchema = z.object({
  name: z.string().min(1, { message: "حقل مطلوب" }),
  title: z.string().min(1, { message: "حقل مطلوب" }),
  clinicId: z.string({ required_error: "العيادة مطلوبة" }).min(1),
  imageUrl: z
    .string({ required_error: "الصورة مطلوبة" })
    .min(1, { message: "الصورة مطلوبة" }),
  scheduleIds: z.array(z.string()).optional().default([]),
});

export type DoctorFormType = z.infer<typeof doctorSchema>;
