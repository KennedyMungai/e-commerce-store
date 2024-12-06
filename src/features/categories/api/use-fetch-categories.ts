import { client } from "@/lib/hc";
import { useInfiniteQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.categories.$get, 200>;

export const useFetchCategories = () =>
  useInfiniteQuery<ResponseType, Error>({
    initialPageParam: 1,
    queryKey: ["categories"],
    getNextPageParam: (lastPage) => lastPage.nextPage,
    queryFn: async ({ pageParam }) => {
      const response = await client.api.categories.$get({
        query: { page: pageParam as string, limit: "10" },
      });

      if (!response.ok) throw new Error("Failed to fetch categories");

      return await response.json();
    },
  });
