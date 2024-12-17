"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useAddCategoryDialog } from "@/features/categories/hooks/use-add-category-dialog";
import { useAddProductDialog } from "@/features/products/hooks/use-add-product-dialog";
import { useAddSupplierDialog } from "@/features/suppliers/hooks/use-add-supplier-dialog";
import { PlusIcon, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const AdminTopbar = () => {
  const pathname = usePathname();

  const { open: openCategoryModal } = useAddCategoryDialog();
  const { open: openProductModal } = useAddProductDialog();
  const { open: openSupplierModal } = useAddSupplierDialog();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <div className="flex h-14 w-full items-center justify-between border-b p-4">
      <h3 className="text-2xl capitalize">
        {pathname === "/dashboard" && "Dashboard"}
        {pathname === "/dashboard/categories" && "Categories"}
        {pathname === "/dashboard/suppliers" && "Suppliers"}
        {pathname === "/dashboard/orders" && "Orders"}
        {/* TODO: Fix the categories error */}
        {pathname.startsWith("/dashboard/categories/category") &&
          pathname.split("/").length === 4 &&
          pathname.split("/").length < 5 &&
          "Category"}
        {pathname.startsWith("/dashboard/suppliers/supplier") && "Supplier"}
        {pathname.startsWith("/dashboard/categories/category") &&
          pathname.split("/")[5] === "product" &&
          "Product"}
      </h3>
      <div className="flex items-center gap-4">
        {pathname === "/dashboard/categories" && (
          <Button variant={"outline"} size="icon" onClick={openCategoryModal}>
            <PlusIcon className="size-5" />
          </Button>
        )}
        {pathname.startsWith("/dashboard/categories/category") && (
          <Button variant={"outline"} size="icon" onClick={openProductModal}>
            <PlusIcon className="size-5" />
          </Button>
        )}
        {pathname === "/dashboard/suppliers" && (
          <Button variant={"outline"} size="icon" onClick={openSupplierModal}>
            <PlusIcon className="size-5" />
          </Button>
        )}
        <ModeToggle />
        {pathname === "/dashboard" && (
          <Button variant={"outline"} size="icon" asChild>
            <Link href="/">
              <ShoppingCartIcon className="size-5" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default AdminTopbar;
