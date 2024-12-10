import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddSupplierForm from "@/features/suppliers/components/add-supplier-form";
import { useAddSupplierDialog } from "@/features/suppliers/hooks/use-add-supplier-dialog";

const AddSupplierDialog = () => {
  const { isOpen, close } = useAddSupplierDialog();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new supplier</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <AddSupplierForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSupplierDialog;
