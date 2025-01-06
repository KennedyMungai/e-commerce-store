"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useFetchAllProducts } from "@/features/products/api/use-fetch-all-products";
import Image from "next/image";

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
    <ScrollArea className="flex h-fit w-full flex-row gap-x-2 overflow-x-auto border-2 p-2">
      {productsData.data.map((product) => (
        <div className="relative aspect-video h-full" key={product.id}>
          <Image
            src={product.image_url ?? ""}
            width={200}
            height={200}
            alt={product.name}
            className="rounded-md object-fill"
          />
          <p>{product.name}</p>
        </div>
      ))}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ProductsSlider;
