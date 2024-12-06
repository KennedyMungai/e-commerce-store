import { client } from "@/lib/hc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.categories)[":id"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.categories)[":id"]["$patch"]
>;

export const useEditCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.categories[":id"].$patch({
        json,
        param,
      });

      if (!response.ok) throw new Error("Failed to update category");

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success(`${data.name} category updated`);

      queryClient.invalidateQueries({ queryKey: ["categories"] });
      // TODO: Revalidate individual category data
    },
    onError: ({ message }) => toast.error(message),
  });

  return mutation;
};
