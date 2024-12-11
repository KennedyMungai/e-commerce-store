import { client } from "@/lib/hc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.products.$post, 200>;

type RequestType = InferRequestType<typeof client.api.products.$post>;

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.products.$post({ json });

      if (!response.ok) throw new Error("Failed to create product");

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });

      toast.success("Product created");
    },
    onError: ({ message }) => toast.error(message),
  });

  return mutation;
};
