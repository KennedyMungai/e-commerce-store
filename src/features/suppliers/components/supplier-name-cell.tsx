"use client";

import { useFetchSupplier } from "@/features/suppliers/api/use-fetch-supplier";
import Link from "next/link";

type Props = {
  supplier_id: string;
};

const SupplierNameCell = ({ supplier_id }: Props) => {
  const {
    data: suppliersData,
    isPending: isSuppliersDataPending,
    isError: isSuppliersDataError,
  } = useFetchSupplier(supplier_id);

  // TODO: Update the loading markup
  if (isSuppliersDataPending) return <div>Loading...</div>;

  // TODO: Update the error markup
  if (isSuppliersDataError) return <div>Error</div>;

  return (
    <Link
      href={`/dashboard/suppliers/supplier/${supplier_id}`}
      className="hover:underline"
    >
      {suppliersData.data.name}
    </Link>
  );
};

export default SupplierNameCell;
