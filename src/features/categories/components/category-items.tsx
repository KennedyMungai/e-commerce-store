"use client";

import { useFetchCategory } from "@/features/categories/api/use-fetch-category";
import { useFetchProducts } from "@/features/products/api/use-fetch-products";
import ProductCard from "@/features/products/components/product-card";

type Props = {
  categoryId: string;
};

const CategoryItems = ({ categoryId }: Props) => {
  const {
    data: categoryData,
    isPending: isCategoryDataPending,
    isError: isCategoryDataError,
  } = useFetchCategory(categoryId);

  const {
    data: productsData,
    isPending: isProductsDataPending,
    isError: isProductsDataError,
  } = useFetchProducts(categoryId);

  // TODO: Update the loading markup
  if (isCategoryDataPending || isProductsDataPending)
    return <div>Loading...</div>;

  // TODO: Update the error markup
  if (isCategoryDataError || isProductsDataError) return <div>Error</div>;

  const products = productsData.data
    .map((product) => ({
      ...product,
      colors: product.colors as string[],
      sizes: product.sizes as (
        | "XS"
        | "S"
        | "M"
        | "L"
        | "XL"
        | "XXL"
        | "XXXL"
      )[],
      createdAt: new Date(product.createdAt),
      updatedAt: product.updatedAt ? new Date(product.updatedAt) : null,
    }))
    .filter((product) => product.image_url !== null);

  return (
    <div className="scrollbar-none h-full overflow-y-auto p-4">
      <h3 className="text-2xl font-semibold capitalize text-neutral-700">
        {categoryData?.data.name}
      </h3>
      <p className="text-sm text-muted-foreground">
        {categoryData?.data.description}
      </p>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryItems;
