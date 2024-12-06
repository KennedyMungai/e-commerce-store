"use client";

import { Button } from "@/components/ui/button";
import { useEditCategoryDialog } from "@/features/categories/hooks/use-edit-category-dialog";

type Props = {
  id: string;
};

const EditCategoryButton = ({ id }: Props) => {
  const { open } = useEditCategoryDialog({ id });

  return (
    <Button
      variant={"outline"}
      className="w-full"
      onClick={() => {
        open();

        console.log(id);
      }}
    >
      Edit Category
    </Button>
  );
};

export default EditCategoryButton;
