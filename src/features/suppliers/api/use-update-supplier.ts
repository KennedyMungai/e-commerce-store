import { client } from "@/lib/hc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.suppliers)[":id"]["$patch"],
  200
>;

type RequestType = InferRequestType<
  (typeof client.api.suppliers)[":id"]["$patch"]
>;

export const useUpdateSupplier = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.suppliers[":id"].$patch({
        json,
        param: {
          id,
        },
      });

      if (!response.ok) throw new Error("Failed to update supplier info");

      return await response.json();
    },
    onError: ({ message }) => toast.error(message),
    onSuccess: ({ data }) => {
      toast.success(`${data.name} supplier updated`);

      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      queryClient.invalidateQueries({ queryKey: ["supplier", { id }] });
    },
  });

  return mutation;
};
