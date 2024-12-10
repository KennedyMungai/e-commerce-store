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
import { InsertSupplierSchema, InsertSupplierType } from "@/db/schema";
import { useCreateSupplier } from "@/features/suppliers/api/use-create-supplier";
import { useAddSupplierDialog } from "@/features/suppliers/hooks/use-add-supplier-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const AddSupplierForm = () => {
  const { mutate: createSupplier, isPending: isCreateSupplierPending } =
    useCreateSupplier();

  const { close } = useAddSupplierDialog();

  const form = useForm<InsertSupplierType>({
    resolver: zodResolver(InsertSupplierSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
    },
  });

  const onSubmit = (values: InsertSupplierType) => {
    createSupplier(
      { json: values },
      {
        onSuccess: () => {
          form.reset();

          close();
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Supplier Name"
                  disabled={
                    form.formState.isSubmitting || isCreateSupplierPending
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Supplier Email"
                  type="email"
                  disabled={
                    form.formState.isSubmitting || isCreateSupplierPending
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Supplier Phone Number"
                  type="tel"
                  disabled={
                    form.formState.isSubmitting || isCreateSupplierPending
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting || isCreateSupplierPending}
        >
          Add Supplier
        </Button>
      </form>
    </Form>
  );
};

export default AddSupplierForm;
