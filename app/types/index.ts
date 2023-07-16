import { Appointment, Clinic, Doctor, Patient, Schedule } from "@prisma/client";

export type ClinicsWithDoctors = (Clinic & { doctors: Doctor[] })[];

export type AppointmentsWithDoctorAndPatient = Omit<
  AppointmentWithDoctorAndPatient,
  "schedule"
>[];

export type AppointmentWithDoctorAndPatient = Appointment & {
  doctor: Doctor;
  patient: Patient;
  schedule: Schedule;
};
