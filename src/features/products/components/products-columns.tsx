import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UploadImageButton from "@/features/products/components/upload-image";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDownIcon,
  MoreVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const ProductsColumns: ColumnDef<{
  id: string;
  name: string;
  description: string;
  price: string;
  image_url: string | null;
  colors: string[] | null;
  sizes: string[] | null;
  supplier_id: string;
  createdAt: Date;
  updatedAt: Date | null;
  category_id: string;
  quantity: number;
  supplier: string;
}>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { name, id, category_id } = row.original;

      return (
        <Link
          href={`/dashboard/categories/category/${category_id}/product/${id}`}
          className="cursor-pointer hover:underline"
        >
          {name}
        </Link>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "image_url",
    header: "Image",
    cell: ({ row }) => {
      const { id, image_url, name } = row.original;

      return (
        <div>
          {image_url ? (
            <Image
              src={image_url}
              width={40}
              height={40}
              alt={`${name} image`}
            />
          ) : (
            <UploadImageButton id={id} />
          )}
        </div>
      );
    },
  },
  {
    id: "supplier",
    header: "Supplier",
    cell: ({ row }) => {
      const { supplier_id, supplier } = row.original;

      return (
        <Link href={`/dashboard/suppliers/supplier/${supplier_id}`}>
          {supplier}
        </Link>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { id } = row.original;

      // TODO: Implemented edit and delete functionality

      console.log(id);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="p-0">
              <MoreVerticalIcon className="size-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-fit space-y-2">
            <DropdownMenuItem className="flex cursor-pointer justify-center p-1">
              <Button size={"icon"} variant={"outline"}>
                <PencilIcon className="size-5" />
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex cursor-pointer justify-center p-1">
              <Button size="icon" variant={"outline"}>
                <TrashIcon className="size-5" />
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
