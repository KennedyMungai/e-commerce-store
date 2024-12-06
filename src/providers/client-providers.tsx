"use client";

import AddCategoryDialog from "@/features/categories/components/add-category-dialog";
import { useEffect, useState } from "react";

const ClientProviders = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <>
      <AddCategoryDialog />
    </>
  );
};

export default ClientProviders;
