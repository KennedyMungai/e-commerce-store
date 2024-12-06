import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.categories)[":id"]["$get"],
  200
>;

export const useFetchCategory = (id: string) =>
  useQuery<ResponseType, Error>({
    queryKey: ["category", { id }],
    queryFn: async () => {
      const response = await client.api.categories[":id"].$get({
        param: {
          id,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch category");

      return await response.json();
    },
  });
