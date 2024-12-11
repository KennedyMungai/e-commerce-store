import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.orders)[":id"]["$get"],
  200
>;

type RequestType = InferRequestType<(typeof client.api.orders)[":id"]["$get"]>;

export const useFetchOrder = (id: string) =>
  useQuery<ResponseType, Error, RequestType>({
    queryKey: ["order", { id }],
    queryFn: async () => {
      const response = await client.api.orders[":id"].$get({
        param: {
          id,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch order");

      return await response.json();
    },
  });
