import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InsertCategorySchema, InsertCategoryType } from "@/db/schema";
import { useEditCategory } from "@/features/categories/api/use-edit-category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type Props = {
  id: string;
};

const EditCategoryForm = ({ id }: Props) => {
  const form = useForm<InsertCategoryType>({
    resolver: zodResolver(InsertCategorySchema),
    // TODO: Use values from the table as the defaults
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { mutate, isPending } = useEditCategory();

  const handleSubmit = (values: InsertCategoryType) => {
    mutate({
      json: values,
      param: {
        id,
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Category Name"
                  disabled={form.formState.isSubmitting || isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Category Description"
                  rows={4}
                  disabled={form.formState.isSubmitting || isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mt-4 w-full"
          disabled={form.formState.isSubmitting || isPending}
        >
          Update Category
        </Button>
      </form>
    </Form>
  );
};

export default EditCategoryForm;
