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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new product</DialogTitle>
        </DialogHeader>
        <div className="max-h-[20rem] space-y-4 overflow-y-auto">
          <AddProductForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
