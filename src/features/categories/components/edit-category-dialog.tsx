import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditCategoryForm from "@/features/categories/components/edit-category-form";

type Props = {
  id: string;
  name: string;
  description: string;
};

const EditCategoryDialog = ({ id, name, description }: Props) => {
  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Edit Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <EditCategoryForm id={id} name={name} description={description} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryDialog;
