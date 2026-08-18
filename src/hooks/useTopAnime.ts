import { getTopAnime } from "@/api/animeApi";
import { useQuery } from "@tanstack/react-query";

export function useTopAnime() {
  return useQuery({
    queryKey: ["top-anime"],
    queryFn: getTopAnime,
    staleTime: 1000 * 60 * 60 * 24,
  });
}
