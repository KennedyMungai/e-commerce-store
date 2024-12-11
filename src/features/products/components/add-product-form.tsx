import { Badge } from "@/components/ui/badge";
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { InsertProductSchema, InsertProductType } from "@/db/schema";
import { useFetchSuppliers } from "@/features/suppliers/api/use-fetch-suppliers";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export enum ColorEnum {
  Red = "#FF0000",
  Blue = "#0000FF",
  Green = "#00FF00",
  Yellow = "#FFFF00",
  Black = "#000000",
  White = "#FFFFFF",
  Gray = "#808080",
  Pink = "#FFC0CB",
  Purple = "#800080",
  Orange = "#FFA500",
  Brown = "#A52A2A",
  Navy = "#000080",
  Teal = "#008080",
  Maroon = "#800000",
  Olive = "#808000",
  Aqua = "#00FFFF",
  Silver = "#C0C0C0",
  Lavender = "#E6E6FA",
  Turquoise = "#40E0D0",
}

// Helper function to get color name from hex code (optional)
export function getColorNameByHex(hex: string): string | undefined {
  return Object.keys(ColorEnum).find(
    (key) => ColorEnum[key as keyof typeof ColorEnum] === hex,
  );
}

const COLOR_OPTIONS = Object.keys(ColorEnum) as (keyof typeof ColorEnum)[];

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

type ColorType =
  | "Red"
  | "Blue"
  | "Green"
  | "Yellow"
  | "Black"
  | "White"
  | "Gray"
  | "Pink"
  | "Purple"
  | "Orange"
  | "Brown"
  | "Navy"
  | "Teal"
  | "Maroon"
  | "Olive"
  | "Aqua"
  | "Silver"
  | "Lavender"
  | "Turquoise";

const AddProductForm = () => {
  const pathname = usePathname();

  const { data: suppliersData } = useFetchSuppliers();

  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

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

  const toggleColor = (color: keyof typeof ColorEnum) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  };

  // Helper function to toggle size selection
  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  // TODO: Make the add product form scrollable

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="h-full space-y-4 overflow-y-auto"
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
                  min={0}
                  onChange={(e) => {
                    const value =
                      e.target.value === "" ? 0 : parseInt(e.target.value);
                    form.setValue("quantity", value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Colors</FormLabel>
          {/* TODO: Make this scrollable */}
          <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
            <div className="mb-2 flex flex-wrap gap-2 p-2">
              {COLOR_OPTIONS.map((color) => (
                <Button
                  key={color}
                  type="button"
                  variant={
                    selectedColors.includes(color) ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => toggleColor(color)}
                  className="dark:text-white"
                  style={{
                    backgroundColor: selectedColors.includes(color)
                      ? ColorEnum[color]
                      : "transparent",
                    color: selectedColors.includes(color)
                      ? color === "White"
                        ? "black"
                        : "white"
                      : "black",
                  }}
                >
                  {color}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {selectedColors.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-x-2">
              {selectedColors.map((color) => (
                <Badge
                  key={color}
                  variant="secondary"
                  className="flex items-center"
                  style={{
                    backgroundColor: ColorEnum[color as keyof typeof ColorEnum],
                    color: color === "White" ? "black" : "white",
                  }}
                >
                  {color}
                  <XIcon
                    className="ml-2 h-4 w-4 cursor-pointer"
                    onClick={() => toggleColor(color as ColorType)}
                  />
                </Badge>
              ))}
            </div>
          )}
          <FormDescription>Select product colors</FormDescription>
        </FormItem>

        {/* Size Multiselect */}
        <FormItem>
          <FormLabel>Sizes</FormLabel>
          <div className="mb-2 flex flex-wrap gap-2">
            {SIZE_OPTIONS.map((size) => (
              <Button
                key={size}
                type="button"
                variant={selectedSizes.includes(size) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSize(size)}
              >
                {size}
              </Button>
            ))}
          </div>
          {selectedSizes.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {selectedSizes.map((size) => (
                <Badge
                  key={size}
                  variant="secondary"
                  className="flex items-center"
                >
                  {size}
                  <XIcon
                    className="ml-2 h-4 w-4 cursor-pointer"
                    onClick={() => toggleSize(size)}
                  />
                </Badge>
              ))}
            </div>
          )}
          <FormDescription>Select available product sizes</FormDescription>
        </FormItem>

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
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the product supplier" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* TODO: Implement the loading and error states */}
                  {suppliersData?.data.map((supplier) => (
                    <SelectItem value={supplier.id} key={supplier.id}>
                      {supplier.name}
                    </SelectItem>
                  ))}
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
