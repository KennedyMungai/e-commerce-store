import { SelectSupplierType } from "@/db/schema";
import { ColumnDef } from "@tanstack/react-table";

export const SupplierColumns: ColumnDef<SelectSupplierType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
];
