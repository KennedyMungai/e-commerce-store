import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.orderItems.$get, 200>;

export const useFetchOrderItems = () =>
  useQuery<ResponseType, Error>({
    queryKey: ["orderItems"],
    queryFn: async () => {
      const response = await client.api.orderItems.$get();

      if (!response.ok) throw new Error("Failed to fetch the order items");

      return await response.json();
    },
  });
