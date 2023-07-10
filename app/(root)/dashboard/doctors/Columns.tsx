"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./CellActions";

export type DoctorColumn = {
  id: string;
  name: string;
  title: string;
  clinicName: string;
};

export const filterKeys = [
  {
    accessorKey: "name",
    label: "الاسم",
  },
  {
    accessorKey: "clinicName",
    label: "العيادة",
  },
];

export const columns: ColumnDef<DoctorColumn>[] = [
  {
    accessorKey: "name",
    header: "الطبيب",
  },
  {
    accessorKey: "clinicName",
    header: "العيادة",
  },
  {
    accessorKey: "title",
    header: "التخصص",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
