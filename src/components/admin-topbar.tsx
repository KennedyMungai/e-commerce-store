"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useAddCategoryDialog } from "@/features/categories/hooks/use-add-category-dialog";
import { PlusIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const AdminTopbar = () => {
  const pathname = usePathname();

  const { setIsOpen } = useAddCategoryDialog();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <div className="flex h-14 w-full items-center justify-between border-b p-4">
      <h3 className="text-2xl capitalize">
        {pathname.split("/")[2] ?? "dashboard"}
      </h3>
      <div className="flex items-center gap-4">
        {pathname !== "/dashboard" && (
          <Button variant={"outline"} size="icon" onClick={handleClick}>
            <PlusIcon className="size-5" />
          </Button>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default AdminTopbar;
