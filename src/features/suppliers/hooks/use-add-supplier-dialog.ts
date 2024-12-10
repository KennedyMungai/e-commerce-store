import { parseAsBoolean, useQueryState } from "nuqs";

export const useAddSupplierDialog = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "addSupplierDialog",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
  );

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return {
    open,
    close,
    isOpen,
    setIsOpen,
  };
};
