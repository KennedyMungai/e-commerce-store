import { SelectProductType } from "@/db/schema";
import { ColumnDef } from "@tanstack/react-table";

export const SupplierProductColumns: ColumnDef<SelectProductType>[] = [
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
