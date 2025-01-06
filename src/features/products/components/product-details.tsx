"use client";

import { useFetchProduct } from "@/features/products/api/use-fetch-product";
import { ImageOffIcon } from "lucide-react";
import Image from "next/image";

type Props = {
  productId: string;
};

const ProductDetails = ({ productId }: Props) => {
  const {
    data: productData,
    isPending: isProductDataPending,
    isError: isProductDataError,
  } = useFetchProduct(productId);

  // TODO: Updated the data fetching markup
  if (isProductDataPending) return <div>Loading...</div>;

  // TODO: Updated the data error markup
  if (isProductDataError) return <div>Error</div>;

  //   TODO: Fix the markup
  return (
    <div className="scrollbar-none h-[90vh] overflow-y-auto p-4">
      <div className="flex size-full gap-x-2">
        <div className="relative col-span-1 size-full text-rose-500">
          {productData.data.image_url && (
            <Image
              src={productData.data.image_url}
              fill
              alt={productData.data.name}
              className="rounded-md object-fill"
            />
          )}
          {!productData.data.image_url && (
            <div className="flex h-full w-full items-center justify-center rounded-md bg-neutral-100">
              <ImageOffIcon size={48} />
            </div>
          )}
        </div>
        <div className="relative size-full">
          <h2>{productData.data.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
