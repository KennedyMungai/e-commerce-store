import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddProductForm from "@/features/products/components/add-product-form";
import { useAddProductDialog } from "@/features/products/hooks/use-add-product-dialog";

const AddProductDialog = () => {
  const { isOpen, close } = useAddProductDialog();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="h-full overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add a new product</DialogTitle>
        </DialogHeader>
        <div className="p-2">
          <AddProductForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
