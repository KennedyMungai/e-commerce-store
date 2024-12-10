import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.suppliers)[":id"]["$get"],
  200
>;

type RequestType = InferRequestType<
  (typeof client.api.suppliers)[":id"]["$get"]
>;

export const useFetchSupplier = (id: string) =>
  useQuery<ResponseType, Error, RequestType>({
    queryKey: ["supplier", { id }],
    queryFn: async () => {
      const response = await client.api.suppliers[":id"].$get({
        param: {
          id,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch supplier");

      return await response.json();
    },
  });
