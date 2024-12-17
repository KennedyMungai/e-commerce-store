"use client";

import { DataTable } from "@/components/data-table";
import { useFetchProducts } from "@/features/products/api/use-fetch-products";
import { ProductsColumns } from "@/features/products/components/products-columns";

type Props = {
  id: string;
};

const ProductsTable = ({ id }: Props) => {
  const {
    data: productsData,
    isPending: isProductsDataPending,
    isError: isProductsDataError,
  } = useFetchProducts(id);

  if (isProductsDataPending) return <div>Loading...</div>;

  if (isProductsDataError) return <div>Error</div>;

  const products = productsData.data.map((product) => ({
    ...product,
    createdAt: new Date(product.createdAt),
    updatedAt: product.updatedAt ? new Date(product.updatedAt) : null,
  }));

  return (
    <div className="p-4">
      <DataTable columns={ProductsColumns} data={products} />
    </div>
  );
};

export default ProductsTable;
