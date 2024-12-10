import { client } from "@/lib/hc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.suppliers)[":id"]["$delete"],
  200
>;

type RequestType = InferRequestType<
  (typeof client.api.suppliers)[":id"]["$delete"]
>;

export const useDeleteSupplier = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.suppliers[":id"].$delete({
        param,
      });

      if (!response.ok) throw new Error("Failed to delete supplier");

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success(`${data.name} supplier deleted`);

      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
    onError: ({ message }) => toast.error(message),
  });

  return mutation;
};
