import { parseAsBoolean, useQueryState } from "nuqs";

export const useEditCategoryDialog = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "editCategoryDialog",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    open,
    close,
    isOpen,
    setIsOpen,
  };
};
