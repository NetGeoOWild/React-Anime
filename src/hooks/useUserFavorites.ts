import { getUserFavorites } from "@/api/userApi";
import { useQuery } from "@tanstack/react-query";

export function useUserFavorites(user_id: string | null) {
  return useQuery({
    queryKey: ["user-favorites", user_id],
    queryFn: () => getUserFavorites(user_id),
    enabled: Boolean(user_id),
  });
}
