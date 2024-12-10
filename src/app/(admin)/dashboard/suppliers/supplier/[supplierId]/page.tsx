type Props = {
  params: {
    supplierId: string;
  };
};

const SupplierPage = async ({ params }: Props) => {
  const { supplierId } = await params;

  return <div>{supplierId}</div>;
};

export default SupplierPage;
