"use client";

import AddCategoryDialog from "@/features/categories/components/add-category-dialog";
import EditCategoryDialog from "@/features/categories/components/edit-category-dialog";
import AddProductDialog from "@/features/products/components/add-product-dialog";
import AddSupplierDialog from "@/features/suppliers/components/add-supplier-dialog";
import { useEffect, useState } from "react";

const ClientProviders = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <>
      <AddCategoryDialog />
      <EditCategoryDialog />
      <AddProductDialog />
      <AddSupplierDialog />
    </>
  );
};

export default ClientProviders;
