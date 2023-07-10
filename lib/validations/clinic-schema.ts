import * as z from "zod";

export const clinicSchema = z.object({
  name: z.string().min(1, { message: "حقل مطلوب" }),
  imageUrl: z
    .string({ required_error: "الصورة مطلوبة" })
    .min(1, { message: "الصورة مطلوبة" }),
});

export type ClinicFormType = z.infer<typeof clinicSchema>;
