import * as z from "zod";

export const appointmentSchema = z.object({
  doctorId: z.string().min(1),
  scheduleId: z.string().min(1),
  date: z.date(),
  patientName: z.string().min(1),
  phoneNo: z.string().min(10),
});

export type AppointmentFormType = z.infer<typeof appointmentSchema>;
