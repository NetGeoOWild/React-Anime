import { getAnime } from "@/api/animeApi";
import { useQuery } from "@tanstack/react-query";

export function useAnimeById(id: string) {
  return useQuery({
    queryKey: ["anime", id],
    queryFn: () => getAnime(id),
  });
}
