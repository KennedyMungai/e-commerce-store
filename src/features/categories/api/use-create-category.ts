import { client } from "@/lib/hc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.categories.$post, 200>;
type RequestType = InferRequestType<typeof client.api.categories.$post>;

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await client.api.categories.$post(data);

      if (!response.ok) throw new Error("Failed to create category");

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success(`${data.name} category created`);

      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: ({ message }) => toast.error(message),
  });

  return mutation;
};
