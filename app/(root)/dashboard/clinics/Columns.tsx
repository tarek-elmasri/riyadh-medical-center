"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./CellActions";

export type ClinicColumn = {
  id: string;
  name: string;
  doctorsCount: number;
  createdAt: string;
};

export const filterKeys = [
  {
    accessorKey: "name",
    label: "العيادة",
  },
];

export const columns: ColumnDef<ClinicColumn>[] = [
  {
    accessorKey: "name",
    header: "العيادة",
  },
  {
    accessorKey: "doctorsCount",
    header: "عدد الأطباء",
  },
  {
    accessorKey: "createdAt",
    header: "تاريخ الانشاء",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
