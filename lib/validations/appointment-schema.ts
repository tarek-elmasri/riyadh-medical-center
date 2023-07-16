import * as z from "zod";
import { standardDate } from "../utils";

export const appointmentSchema = z.object({
  doctorId: z.string().min(1, { message: "حقل مطلوب" }),
  date: z.date({ required_error: "حقل مطلوب" }).min(standardDate(new Date())),
  patientName: z.string().min(1, { message: "حقل مطلوب" }),
  phoneNo: z
    .string()
    .min(10, { message: "رقم هاتف غير صحيح" })
    .max(10, { message: "رقم هاتف غير صحيح" })
    .startsWith("05", { message: "رقم هاتف غير صحيح" }),
  scheduleId: z
    .string({ required_error: "حقل مطلوب" })
    .min(1, { message: "حقل مطلوب" }),
});

export type AppointmentFormType = z.infer<typeof appointmentSchema>;
