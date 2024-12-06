"use client";

import { Button } from "@/components/ui/button";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";
import { TrashIcon } from "lucide-react";

type Props = {
  id: string;
};

const DeleteCategoryButton = ({ id }: Props) => {
  const { mutate, isPending } = useDeleteCategory();

  const handleClick = () => {
    mutate({ param: { id } });
  };

  return (
    <Button
      variant={"outline"}
      className="w-full"
      disabled={isPending}
      onClick={handleClick}
    >
      <TrashIcon className="size-5" />
    </Button>
  );
};

export default DeleteCategoryButton;
