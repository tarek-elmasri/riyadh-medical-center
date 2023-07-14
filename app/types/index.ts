import { Clinic, Doctor } from "@prisma/client";

export type ClinicsWithDoctors = (Clinic & { doctors: Doctor[] })[];
