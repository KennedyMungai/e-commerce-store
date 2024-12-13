import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.suppliers)[":id"]["$get"],
  200
>;

export const useFetchSupplier = (id: string) =>
  useQuery<ResponseType, Error>({
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
