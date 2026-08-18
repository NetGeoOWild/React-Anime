import { getAnimeBySearch } from "@/api/animeApi";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useAnimeBySearch(search: string) {
  return useInfiniteQuery({
    queryKey: ["anime-list", "search", search],
    queryFn: ({ pageParam }) => getAnimeBySearch(pageParam, search),
    initialPageParam: 1,
    enabled: Boolean(search.trim()),
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.hasNextPage
        ? lastPage.pageInfo.currentPage + 1
        : undefined;
    },
  });
}
