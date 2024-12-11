import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.orders.$get, 200>;

export const useFetchOrders = () =>
  useQuery<ResponseType, Error>({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await client.api.orders.$get();

      if (!response.ok) throw new Error("Failed to fetch orders");

      return await response.json();
    },
  });
