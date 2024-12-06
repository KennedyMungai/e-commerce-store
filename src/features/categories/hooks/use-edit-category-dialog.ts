import { parseAsString, useQueryState } from "nuqs";

type Props = {
  id: string;
};

export const useEditCategoryDialog = ({ id }: Props) => {
  const [isOpen, setIsOpen] = useQueryState(
    "editCategoryDialog",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  );

  const open = () => setIsOpen(id);
  const close = () => setIsOpen("");

  return {
    open,
    close,
    isOpen,
    setIsOpen,
  };
};
