"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditCategoryForm from "@/features/categories/components/edit-category-form";
import { useEditCategoryDialog } from "@/features/categories/hooks/use-edit-category-dialog";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditCategoryDialog = () => {
  const params = useSearchParams();

  const { isOpen, setIsOpen } = useEditCategoryDialog({
    id: params.get("id") ?? "",
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <Dialog open={!!isOpen} onOpenChange={() => setIsOpen("")} modal={false}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Edit Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <EditCategoryForm id={params.get("id") ?? ""} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryDialog;
