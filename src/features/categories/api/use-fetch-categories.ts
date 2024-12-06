import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.categories.$get, 200>;

export const useFetchCategories = () =>
  useQuery<ResponseType, Error>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await client.api.categories.$get();

      if (!response.ok) throw new Error("Failed to fetch categories");

      const { data } = await response.json();

      return data;
    },
  });
