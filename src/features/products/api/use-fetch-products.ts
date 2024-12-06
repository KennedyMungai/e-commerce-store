import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.products)[":categoryId"]["$get"],
  200
>;

type RequestType = InferRequestType<
  (typeof client.api.products)[":categoryId"]["$get"]
>;

export const useFetchProducts = (categoryId: string) =>
  useQuery<ResponseType, Error, RequestType>({
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
