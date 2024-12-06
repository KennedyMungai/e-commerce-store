import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.products.$get, 200>;

export const useFetchProducts = () =>
  useQuery<ResponseType, Error>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await client.api.products.$get();

      if (!response.ok) throw new Error("Failed to fetch products");

      return await response.json();
    },
  });
