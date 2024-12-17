import { ColumnDef } from "@tanstack/react-table";

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
  },
  {
    accessorKey: "createdAt",
    header: "Supplied on",
  },
];
