import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.products)[":productId"]["$get"],
  200
>;

export const useFetchProduct = (productId: string) =>
  useQuery<ResponseType, Error>({
    queryKey: ["product", { productId }],
    queryFn: async () => {
      const response = await client.api.products[":productId"]["$get"]({
        param: {
          productId,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch product");

      return await response.json();
    },
  });
