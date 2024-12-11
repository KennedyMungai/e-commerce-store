"use client";

import { DataTable } from "@/components/data-table";
import { OrdersColumns } from "./orders-columns";

const OrdersTable = () => {
  return (
    <div className="p-4">
      <DataTable columns={OrdersColumns} data={[]} />
    </div>
  );
};

export default OrdersTable;
