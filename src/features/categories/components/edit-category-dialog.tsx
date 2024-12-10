"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditCategoryForm from "@/features/categories/components/edit-category-form";
import { useEditCategoryDialog } from "@/features/categories/hooks/use-edit-category-dialog";
import { useEffect, useState } from "react";

const EditCategoryDialog = () => {
  const { isOpen, close } = useEditCategoryDialog();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close} modal={false}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <EditCategoryForm id={"45551-515115-51151515-51151"} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryDialog;
