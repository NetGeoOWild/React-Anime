import { getAnimeFavorites } from "@/api/animeApi";
import { useQuery } from "@tanstack/react-query";

export function useAnimeFavorites(userId: string | null, malIds: number[]) {
  return useQuery({
    queryKey: ["anime-favorites", userId, malIds],
    queryFn: () => getAnimeFavorites(malIds),
    enabled: Boolean(userId) && malIds.length > 0,
  });
}
