import { getAnimeListByGenre } from "@/api/animeApi";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useAnimeByGenre(genre: string | null) {
  return useInfiniteQuery({
    queryKey: ["anime-list", "genre", genre],
    queryFn: ({ pageParam }) => getAnimeListByGenre(pageParam, genre as string),
    initialPageParam: 1,
    enabled: Boolean(genre),
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.hasNextPage
        ? lastPage.pageInfo.currentPage + 1
        : undefined;
    },
  });
}
