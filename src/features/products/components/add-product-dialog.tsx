import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddProductForm from "@/features/products/components/add-product-form";
import { useAddProductDialog } from "@/features/products/hooks/use-add-product-dialog";

const AddProductDialog = () => {
  const { isOpen, close } = useAddProductDialog();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="h-[480rem] space-y-4">
        <DialogHeader>
          <DialogTitle>Add a new product</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[480rem] space-y-4">
          <AddProductForm />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
