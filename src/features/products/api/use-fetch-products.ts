import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.products)[":categoryId"]["$get"],
  200
>;

export const useFetchProducts = (categoryId: string) =>
  useQuery<ResponseType, Error>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await client.api.products[":categoryId"]["$get"]({
        param: {
          categoryId,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch products");

      return await response.json();
    },
  });
