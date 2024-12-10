import { client } from "@/lib/hc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.suppliers.$post, 200>;

type RequestType = InferRequestType<typeof client.api.suppliers.$post>;

export const useCreateSupplier = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.suppliers.$post({ json });

      if (!response.ok) throw new Error("Failed to create supplier");

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success(`${data.name} supplier created`);

      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
    onError: ({ message }) => toast.error(message),
  });

  return mutation;
};
