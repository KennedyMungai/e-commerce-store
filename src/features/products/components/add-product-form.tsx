import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { InsertProductSchema, InsertProductType, SizeEnum } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddProductForm = () => {
  const pathname = usePathname();

  const category_id = pathname.split("/")[4];

  const form = useForm<InsertProductType>({
    resolver: zodResolver(InsertProductSchema),
    defaultValues: {
      name: "",
      price: "",
      quantity: 0,
      description: "",
      image_url: "",
      supplier_id: "",
      category_id,
      colors: [],
      sizes: [],
    },
  });

  const handleSubmit = (values: InsertProductType) => {
    console.log(values);
  };

  // TODO: Make the add product form scrollable

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="h-full space-y-4 overflow-y-auto p-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Product Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Product Price" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Product Quantity"
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="colors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Colors</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter colors separated by commas"
                  onChange={(e) => {
                    const colors = e.target.value.split(",");
                    form.setValue("colors", colors);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* TODO: Updated the logic to autofill or select the correct values */}
        <FormField
          control={form.control}
          name="sizes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sizes</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Product Sizes separated by commas"
                  onChange={(e) => {
                    const sizes = e.target.value
                      .split(",")
                      .map((size) => size.trim().toUpperCase())
                      .filter((size) => size !== "");

                    const validSizes = sizes.filter(
                      (size) => SizeEnum.safeParse(size).success,
                    );

                    form.setValue(
                      "sizes",
                      validSizes as z.infer<typeof SizeEnum>[],
                    );
                  }}
                  value={field.value ? field.value.join(",") : ""}
                  autoComplete="on"
                />
              </FormControl>
              <FormDescription>
                Available Sizes: &quot;XS, S, M, L, XL, XXL, XXXL&quot;
              </FormDescription>
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
                  rows={4}
                  {...field}
                  placeholder="Product Description"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="supplier_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supplier</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                {/* TODO: Fetch the supplier's data and map it to the select */}
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the product supplier" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Supplier 1</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Add a new product
        </Button>
      </form>
    </Form>
  );
};

export default AddProductForm;
