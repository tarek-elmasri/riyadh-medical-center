"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type FilterKeys = {
  accessorKey: string;
  label: string;
};
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterKeys?: FilterKeys[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterKeys,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const [searchKey, setSearchKey] = useState(filterKeys?.[0]);

  return (
    <div>
      {/* Filtering */}
      {filterKeys && searchKey && (
        <div className="flex flex-col gap-4 md:flex-row justify-start items-start md:items-center py-4">
          <Select
            defaultValue={searchKey?.accessorKey}
            onValueChange={(value) =>
              setSearchKey(
                filterKeys.find((filter) => filter.accessorKey === value)
              )
            }
          >
            <SelectTrigger className="w-[180px] flex-row-reverse">
              <SelectValue placeholder="حقل البحث" />
            </SelectTrigger>
            <SelectContent>
              {filterKeys.map(
                (option) =>
                  option.accessorKey !== "actions" && (
                    <SelectItem
                      key={option.accessorKey}
                      className="flex-row-reverse"
                      value={option.accessorKey}
                    >
                      {option.label}
                    </SelectItem>
                  )
              )}
            </SelectContent>
          </Select>

          <Input
            placeholder="بحث"
            value={
              (table
                .getColumn(searchKey.accessorKey)
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(searchKey.accessorKey)
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-right" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
