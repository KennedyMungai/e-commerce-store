"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SelectCategoryType } from "@/db/schema";
import EditCategoryDialog from "@/features/categories/components/edit-category-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";

export const CategoryColumns: ColumnDef<SelectCategoryType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { name, id } = row.original;

      return (
        <Link
          href={`/dashboard/categories/${id}`}
          className="cursor-pointer hover:underline"
        >
          {name}
        </Link>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="line-clamp-2 truncate">{row.original.description}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id, name, description } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="p-0">
              <MoreVerticalIcon className="size-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <EditCategoryDialog
                id={id}
                name={name}
                description={description}
              />
            </DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
