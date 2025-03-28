"use client";

import { Button } from "@/components/ui/button";
import { useEditCategoryDialog } from "@/features/categories/hooks/use-edit-category-dialog";
import { PencilIcon } from "lucide-react";

type Props = {
  id: string;
};

const EditCategoryButton = ({ id }: Props) => {
  const { open } = useEditCategoryDialog();

  return (
    <Button variant={"outline"} className="w-full" onClick={open}>
      <PencilIcon className="size-5" />
    </Button>
  );
};

export default EditCategoryButton;
