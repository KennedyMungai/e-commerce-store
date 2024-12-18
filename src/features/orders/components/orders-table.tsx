"use client";

import { DataTable } from "@/components/data-table";
import { OrdersColumns } from "@/features/orders/components/orders-columns";
import { useFetchOrders } from "@/features/orders/api/use-fetch-orders";

const OrdersTable = () => {
  const {
    data: ordersData,
    isPending: isOrdersPending,
    isError: isOrdersError,
  } = useFetchOrders();

  // TODO: Update the loading markup
  if (isOrdersPending) return <div>Loading...</div>;

  // TODO: Update the error markup
  if (isOrdersError) return <div>Error</div>;

  const orders = ordersData.data.map((order) => ({
    ...order,
    createdAt: new Date(order.createdAt),
    updatedAt: order.updatedAt ? new Date(order.updatedAt) : null,
  }));

  return (
    <div className="p-4">
      <DataTable columns={OrdersColumns} data={orders} />
    </div>
  );
};

export default OrdersTable;
