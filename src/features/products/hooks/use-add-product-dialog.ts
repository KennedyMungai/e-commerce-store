import { parseAsBoolean, useQueryState } from "nuqs";

export const useAddProductDialog = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "addProductDialog",
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
