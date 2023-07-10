"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./CellActions";

export type UserColumn = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

export const filterKeys = [
  {
    accessorKey: "name",
    label: "الاسم",
  },
];

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "name",
    header: "الموظف",
  },
  {
    accessorKey: "email",
    header: "البريد الالكتروني",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
