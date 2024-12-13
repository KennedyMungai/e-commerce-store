"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useFetchSupplier } from "@/features/suppliers/api/use-fetch-supplier";
import { useFetchSupplierProducts } from "@/features/suppliers/api/use-fetch-supplier-products";
import { SupplierProductColumns } from "@/features/suppliers/components/supplier-products";
import { MailIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  supplierId: string;
};

const SupplierInfo = ({ supplierId }: Props) => {
  const {
    data: supplierData,
    isPending: isSupplierDataPending,
    isError: isSupplierDataError,
  } = useFetchSupplier(supplierId);

  const {
    data: supplierProducts,
    isPending: isSupplierProductsPending,
    isError: isSupplierProductsError,
  } = useFetchSupplierProducts(supplierId);

  // TODO: Update the loading markup
  if (isSupplierDataPending || isSupplierProductsPending)
    return <div>Loading...</div>;

  // TODO: Update the error markup
  if (isSupplierDataError || isSupplierProductsError) return <div>Error</div>;

  const supplierProductsUpdated = supplierProducts.data.map((supplier) => ({
    ...supplier,
    createdAt: new Date(supplier.createdAt),
    updatedAt: supplier.updatedAt ? new Date(supplier.updatedAt) : null,
  }));

  return (
    <div className="flex size-full flex-col">
      <div className="flex justify-between gap-4">
        {/* TODO: Look into the types for the supplier data */}
        <h1 className="text-3xl font-semibold">{supplierData.data.name}</h1>
        <div className="flex gap-4">
          <Button variant={"outline"} size="icon" asChild>
            {/* TODO: Look into the types for the supplier data */}
            <Link href={`tel:${supplierData.data.phoneNumber}`}>
              <PhoneIcon className="size-5" />
            </Link>
          </Button>
          <Button variant={"outline"} size="icon" asChild>
            {/* TODO: Look into the types for the supplier data */}
            <Link href={`mailto:${supplierData.data.email}`}>
              <MailIcon className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
      <DataTable
        // FIXME: Look into the issue
        columns={SupplierProductColumns}
        data={supplierProductsUpdated}
      />
    </div>
  );
};

export default SupplierInfo;
