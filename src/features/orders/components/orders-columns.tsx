import { SelectOrderType } from "@/db/schema";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const OrdersColumns: ColumnDef<SelectOrderType>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <Link
          href={`/dashboard/orders/order/${id}`}
          className="cursor-pointer hover:underline"
        >
          {id}
        </Link>
      );
    },
  },
  {
    accessorKey: "user_id",
    header: "User ID",
    cell: ({ row }) => {
      const { user_id } = row.original;

      return <Link href={`/dashboard/orders/user/${user_id}`}>{user_id}</Link>;
    },
  },
  {
    accessorKey: "shippingMethod",
    header: "Shipping Method",
  },
];
