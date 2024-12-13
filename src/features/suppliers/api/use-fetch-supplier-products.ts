import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.products)[":supplierId"]["$get"],
  200
>;

export const useFetchSupplierProducts = (supplierId: string) =>
  useQuery<ResponseType, Error>({
    queryKey: ["supplier-products", { supplierId }],
    queryFn: async () => {
      const response = await client.api.products[":supplierId"]["$get"]({
        param: {
          supplierId,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch products");

      return await response.json();
    },
  });
