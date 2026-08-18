import { getAnimeGenres } from "@/api/animeApi";
import { useQuery } from "@tanstack/react-query";

export function useAnimeGenresList() {
  return useQuery({
    queryKey: ["anime-genres"],
    queryFn: getAnimeGenres,
  });
}
