"use client";

import { useFetchCategory } from "@/features/categories/api/use-fetch-category";
import ProductsTable from "@/features/products/components/products-table";

type Props = {
  id: string;
};

const CategoryDetails = ({ id }: Props) => {
  const { data, isPending, isError } = useFetchCategory(id);

  // TODO: Updating loading markup
  if (isPending) return <div>Loading...</div>;

  // TODO: Update the error markup
  if (isError) return <div>Error</div>;

  return (
    <div className="space-y-4 p-4">
      <h3 className="text-2xl font-semibold capitalize text-neutral-700">
        {data?.data.name}
      </h3>
      <ProductsTable id={id} />
    </div>
  );
};

export default CategoryDetails;
