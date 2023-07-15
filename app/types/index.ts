import { Appointment, Clinic, Doctor, Patient } from "@prisma/client";

export type ClinicsWithDoctors = (Clinic & { doctors: Doctor[] })[];

export type AppointmentsWithDoctorAndPatient = (Appointment & {
  doctor: Doctor;
  patient: Patient;
})[];
