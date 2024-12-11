"use client";

import { useFetchSupplier } from "@/features/suppliers/api/use-fetch-supplier";

type Props = {
  supplierId: string;
};

const SupplierInfo = ({ supplierId }: Props) => {
  const {} = useFetchSupplier(supplierId);

  return <div>SupplierInfo</div>;
};

export default SupplierInfo;
