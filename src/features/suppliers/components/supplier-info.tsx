"use client";

import { Button } from "@/components/ui/button";
import { useFetchSupplier } from "@/features/suppliers/api/use-fetch-supplier";
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

  if (isSupplierDataPending) return <div>Loading...</div>;

  if (isSupplierDataError) return <div>Error</div>;

  return (
    <div className="flex size-full flex-col items-center justify-center gap-4">
      {/* TODO: Look into the types for the supplier data */}
      <h1 className="text-3xl font-semibold">{supplierData.data.name}</h1>
      <div className="flex gap-4">
        <Button variant={"outline"} size="icon" asChild>
          {/* TODO: Look into the types for the supplier data */}
          <Link href={`tel:${supplierData.data.phone}`}>
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
  );
};

export default SupplierInfo;
