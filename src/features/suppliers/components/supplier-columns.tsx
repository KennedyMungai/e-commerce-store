import { SelectSupplierType } from "@/db/schema";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const SupplierColumns: ColumnDef<SelectSupplierType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const { id, name } = row.original;

      return (
        <Link
          href={`/dashboard/suppliers/supplier/${id}`}
          className="cursor-pointer hover:underline"
        >
          {name}
        </Link>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const { email } = row.original;

      return (
        <Link href={`mailto:${email}`} className="hover:underline">
          {email}
        </Link>
      );
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => {
      const { phoneNumber } = row.original;

      return (
        <Link href={`tel:${phoneNumber}`} className="hover:underline">
          {phoneNumber}
        </Link>
      );
    },
  },
];
