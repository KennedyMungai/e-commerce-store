"use client";

type Props = {
  productId: string;
};

const ProductDetails = ({ productId }: Props) => {
  return <div className="p-4">{productId}</div>;
};

export default ProductDetails;
