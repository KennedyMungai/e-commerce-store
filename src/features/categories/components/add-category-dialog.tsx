import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddCategoryForm from "@/features/categories/components/add-category-form";
import { useAddCategoryDialog } from "@/features/categories/hooks/use-add-category-dialog";

const AddCategoryDialog = () => {
  const { isOpen, close } = useAddCategoryDialog();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <AddCategoryForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
