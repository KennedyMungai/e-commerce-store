import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAddProductDialog } from "@/features/products/hooks/use-add-product-dialog";

const AddProductDialog = () => {
  const { isOpen, close } = useAddProductDialog();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new product</DialogTitle>
        </DialogHeader>
        <div className="space-y-4"></div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
