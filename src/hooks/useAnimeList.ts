import { getAnimeList } from "@/api/animeApi";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useAnimeList() {
  return useInfiniteQuery({
    queryKey: ["anime-list"],
    queryFn: ({ pageParam }) => getAnimeList(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.hasNextPage
        ? lastPage.pageInfo.currentPage + 1
        : undefined;
    },
  });
}
