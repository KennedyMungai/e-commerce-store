import { client } from "@/lib/hc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.products)[":id"]["$patch"],
  200
>;

type RequestType = InferRequestType<
  (typeof client.api.products)[":id"]["$patch"]
>;

export const useEditProduct = (productId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.products[":id"]["$patch"]({
        json,
        param: {
          id: productId,
        },
      });

      if (!response.ok) throw new Error("Failed to update the product");

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", { productId }] });

      toast.success("Product updated");
    },
    onError: () => toast.error("Failed to update product"),
  });

  return mutation;
};
