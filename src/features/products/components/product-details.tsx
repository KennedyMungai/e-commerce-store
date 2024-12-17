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
    <div className="h-[90vh] p-4">
      <div className="grid size-full grid-flow-col grid-cols-2">
        <div className="flex basis-1/2 items-center justify-center">
          {productData.data.image_url ? (
            <Image
              src={productData.data.image_url}
              width={200}
              height={200}
              alt={productData.data.name}
            />
          ) : (
            <ImageOffIcon className="size-96" />
          )}
        </div>
        <div className="basis-1/2">
          <h3>{productData.data.name}</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
            magnam voluptatem soluta numquam odit cumque asperiores. Aut
            asperiores quo at.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
