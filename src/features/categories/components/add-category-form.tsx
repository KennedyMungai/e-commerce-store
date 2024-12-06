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
import { InsertCategorySchema, InsertCategoryType } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const AddCategoryForm = () => {
  const form = useForm<InsertCategoryType>({
    resolver: zodResolver(InsertCategorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleSubmit = (values: InsertCategoryType) => {
    console.log(values);
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
                <Input {...field} placeholder="Category Name" />
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
                <Input {...field} placeholder="Category Description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4 w-full">
          Create Category
        </Button>
      </form>
    </Form>
  );
};

export default AddCategoryForm;
