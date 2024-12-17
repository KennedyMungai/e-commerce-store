import { ColumnDef } from "@tanstack/react-table";
import { ImageOffIcon } from "lucide-react";
import Image from "next/image";

export const SupplierProductColumns: ColumnDef<{
  createdAt: Date;
  updatedAt: Date | null;
  id: string;
  name: string;
  description: string;
  price: string;
  image_url: string | null;
  colors: string[] | null;
  sizes: string[] | null;
  supplier_id: string;
  category_id: string;
  quantity: number;
}>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "image_url",
    header: "Product Image",
    cell: ({ row }) => {
      const { image_url } = row.original;

      return (
        <div>
          {image_url ? (
            <Image src={image_url} width={40} height={40} alt="product image" />
          ) : (
            <ImageOffIcon className="size-5" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Supplied on",
  },
];
