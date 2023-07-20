"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./CellActions";

export type AppointmentColumn = {
  id: string;
  scheduleLabel: string;
  patientPhoneNo: string;
  patientName: string;
};

export const filterKeys = [
  {
    accessorKey: "patientPhoneNo",
    label: "رقم الهاتف",
  },
];

export const columns: ColumnDef<AppointmentColumn>[] = [
  {
    accessorKey: "patientPhoneNo",
    header: "رقم الهاتف",
  },
  {
    accessorKey: "patientName",
    header: "اسم المريض",
  },
  {
    accessorKey: "scheduleLabel",
    header: "الموعد",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
