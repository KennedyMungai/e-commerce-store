"use client";

import { useFetchAllProducts } from "@/features/products/api/use-fetch-all-products";
import Image from "next/image";
import Link from "next/link";

const ProductsSlider = () => {
  const {
    data: productsData,
    isPending: isProductsDataPending,
    isError: isProductsDataError,
  } = useFetchAllProducts();

  // TODO: Update the loading markup
  if (isProductsDataPending) return <div>Loading...</div>;

  // TODO: Update the error markup
  if (isProductsDataError) return <div>Error</div>;

  //   TODO: Make the items scroll horizontally

  return (
    <div className="flex h-fit w-full flex-row gap-x-6 overflow-x-auto border-2 p-2">
      {productsData.data.map((product) => (
        <Link
          href={`/products/${product.id}`}
          className="relative aspect-video h-full"
          key={product.id}
          title={product.name}
        >
          <Image
            src={product.image_url ?? ""}
            fill
            alt={product.name}
            className="rounded-md object-fill"
          />
          <p>{product.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default ProductsSlider;
