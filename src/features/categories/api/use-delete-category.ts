import { client } from "@/lib/hc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.categories)[":id"]["$delete"],
  200
>;

type RequestType = InferRequestType<
  (typeof client.api.categories)[":id"]["$delete"]
>;

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.categories[":id"].$delete({
        param,
      });

      if (!response.ok) throw new Error("Failed to delete category");

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success(`${data.name} category deleted`);

      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: ({ message }) => toast.error(message),
  });

  return mutation;
};
