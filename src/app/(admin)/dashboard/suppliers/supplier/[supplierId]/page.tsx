import SupplierInfo from "@/features/suppliers/components/supplier-info";

type Props = {
  params: {
    supplierId: string;
  };
};

const SupplierPage = async ({ params }: Props) => {
  const { supplierId } = await params;

  return (
    <div className="h-[90vh] p-4">
      <SupplierInfo supplierId={supplierId} />
    </div>
  );
};

export default SupplierPage;
