"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
  CopyIcon,
  DotFilledIcon
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Copy from "@/components/copy";
import TimeAgo from "@/components/timeago";
import type {HsMachine} from "@/lib/hs.d";
import {cn} from "@/lib/utils";

const columns: ColumnDef<HsMachine>[] = [
  {
    accessorKey: "name",
    header: "名称",
    cell: ({row}) => {
      const user = row.original.user;
      return (
        <div className="">
          <div className={`text-primary font-bold `}>{row.getValue("name")}</div>
          <div className={`text-muted-foreground`}>{user.name}</div>
        </div>
      )
    },
  },
  {
    id: "ipAddresses",
    header: "地址",
    cell: ({row}) => {
      const ipAddresses = row.original.ipAddresses
      return (
        <div className={`group text-muted-foreground flex flex-col gap-y-0.5`}>
          {
            ipAddresses?.sort()?.map((ip) => (
              <div key={ip} className={`flex items-center gap-x-1`}>
                <span className="underline decoration-dotted">{ip}</span>
                <Copy text={ip} className="opacity-0 group-hover:opacity-100"/>
              </div>
            ))
          }
        </div>
      )
    },
  },
  {
    accessorKey: "lastSeen",
    header: "最后在线",
    cell: ({row}) => {
      const {online, lastSeen} = row.original
      return (
        <div className="flex items-center">
          <DotFilledIcon className={cn("w-6 h-6 text-gray-400", online && "text-green-600")}/>
          <TimeAgo time={lastSeen} text={online ? "在线" : undefined}/>
        </div>
      )
    },
  },
  {
    id: "active",
    enableHiding: false,
    cell: ({row}) => {
      const machine = row.original;
      return (
        <div className="flex items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="w-4 h-4"/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/*<DropdownMenuLabel>Actions</DropdownMenuLabel>*/}
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(machine.id)}
              >
                复制机器ID
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export default function DataTable({list}: { list: HsMachine[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const data: HsMachine[] = list;

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            const res = table.getColumn("name")?.setFilterValue(event.target.value)
            return res
          }}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              列 <ChevronDownIcon className="w-4 h-4 ml-2"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className='hover:bg-white' key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
      <div className="flex items-center justify-end py-4 space-x-2">
        <div className="space-x-2">
          {
            table.getCanPreviousPage() && (
              <Button
                variant="link"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                上一页
              </Button>
            )
          }

          {
            table.getCanNextPage() && (
              <Button
                variant="link"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                下一页
              </Button>
            )
          }
        </div>
      </div>
    </div>
  );
}
