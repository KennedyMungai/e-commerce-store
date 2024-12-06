import { parseAsBoolean, useQueryState } from "nuqs";

export const useAddCategoryDialog = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "addCategoryDialog",
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
