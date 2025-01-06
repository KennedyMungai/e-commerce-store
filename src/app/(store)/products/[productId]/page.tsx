type Props = {
  params: {
    productId: string;
  };
};

const ProductPage = async ({ params }: Props) => {
  const { productId } = await params;

  return <div>{productId}</div>;
};

export default ProductPage;
