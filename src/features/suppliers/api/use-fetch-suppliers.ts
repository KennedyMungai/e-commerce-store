import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.suppliers.$get, 200>;

export const useFetchSuppliers = () =>
  useQuery<ResponseType, Error>({
    queryKey: ["suppliers"],
    queryFn: async () => {
      const response = await client.api.suppliers.$get();

      if (!response.ok) throw new Error("Failed to fetch suppliers");

      return await response.json();
    },
  });
