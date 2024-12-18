"use client";

import { DataTable } from "@/components/data-table";
import { SupplierColumns } from "@/features/suppliers/components/supplier-columns";
import { useFetchSuppliers } from "@/features/suppliers/api/use-fetch-suppliers";

const SuppliersTable = () => {
  const {
    data: suppliersData,
    isPending: isSuppliersDataLoading,
    isError: isSuppliersDataError,
  } = useFetchSuppliers();

  // TODO: Update the loading markup
  if (isSuppliersDataLoading) return <div>Loading...</div>;

  // TODO: Update the error markup
  if (isSuppliersDataError) return <div>Error</div>;

  const suppliers = suppliersData.data.map((supplier) => ({
    ...supplier,
    createdAt: new Date(supplier.createdAt),
    updatedAt: supplier.updatedAt ? new Date(supplier.updatedAt) : null,
  }));

  return <DataTable columns={SupplierColumns} data={suppliers} />;
};

export default SuppliersTable;
