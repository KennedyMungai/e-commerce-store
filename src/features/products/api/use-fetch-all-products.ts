import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.products.all.$get, 200>;

export const useFetchAllProducts = () =>
  useQuery<ResponseType, Error>({
    queryKey: ["all-products"],
    queryFn: async () => {
      const response = await client.api.products.all.$get();

      if (!response.ok) throw new Error("Failed to fetch all products");

      return await response.json();
    },
  });
