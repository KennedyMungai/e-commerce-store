import ProductDetails from "@/features/products/components/product-details";

type Props = {
  params: {
    productId: string;
  };
};

const ProductPage = async ({ params }: Props) => {
  const { productId } = await params;

  return <ProductDetails productId={productId} />;
};

export default ProductPage;
