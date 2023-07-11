"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./CellActions";

export type ClinicColumn = {
  id: string;
  label: string;
};

export const columns: ColumnDef<ClinicColumn>[] = [
  {
    accessorKey: "label",
    header: "الوصف",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
