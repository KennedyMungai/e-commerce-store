"use client";

import { DataTable } from "@/components/data-table";
import { ProductsColumns } from "@/features/products/components/products-columns";

const ProductsTable = () => {
  return (
    <div className="p-4">
      <DataTable columns={ProductsColumns} data={[]} />
    </div>
  );
};

export default ProductsTable;
