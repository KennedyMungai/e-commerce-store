"use client";

import { useFetchProduct } from "@/features/products/api/use-fetch-product";
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
    <div className="h-full p-4">
      <div className="grid grid-cols-2">
        <div className="col-span-1">
          {productData?.data.image_url ? (
            <Image
              src={productData?.data.image_url}
              width={400}
              height={400}
              alt="Product"
            />
          ) : (
            <div className="size-full bg-rose-500"></div>
          )}
        </div>
        <div className="-col col-span-1 flex flex-1 items-center justify-center text-center">
          <h3 className="text-2xl font-semibold capitalize text-neutral-700">
            {productData.data.name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
