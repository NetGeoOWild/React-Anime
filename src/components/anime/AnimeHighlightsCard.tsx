import type { AnimeCardPreview } from "@/types/anime";
import { cn } from "@/lib/utils";
import { memo } from "react";
import { Heart } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { addFavorites, removeFavorites } from "@/api/userApi";
import { useUserFavorites } from "@/hooks/useUserFavorites";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  card: AnimeCardPreview;
  className?: string;
};

export const AnimeHighlightsCard = memo(({ card, className }: Props) => {
  const queryClient = useQueryClient();
  const authStore = useAuthStore();
  const { data: favoritesId } = useUserFavorites(authStore.user?.id ?? null);

  const isFavorite = favoritesId?.some(
    (favorite) => favorite.mal_id === card.mal_id,
  );

  async function favoriteHandler(e: React.MouseEvent<SVGElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (!isFavorite) {
      await addFavorites(card.mal_id, authStore.user!.id);
    } else {
      await removeFavorites(card.mal_id);
    }

    await queryClient.invalidateQueries({
      queryKey: ["user-favorites", authStore.user!.id],
    });
  }

  return (
    <div
      className={cn(
        "relative aspect-4/5 cursor-pointer overflow-hidden rounded-lg max-lg:mx-auto max-lg:max-w-117.5",
        className,
      )}
    >
      <img
        src={card.image}
        alt={card.title}
        className="h-full w-full object-cover"
      />
      {authStore.session && (
        <Heart
          className={`dark:text-my-accent/70 text-light-theme/70 absolute top-2.5 right-2.5 z-25 size-7 cursor-pointer transition-all duration-300 hover:scale-[1.2] ${isFavorite ? "dark:fill-my-accent dark:text-my-accent fill-light-theme text-light-theme" : "fill-white"}`}
          onClick={favoriteHandler}
        />
      )}
      <h6 className="absolute bottom-6.25 left-1/2 line-clamp-2 -translate-x-1/2 rounded-[5px] bg-black/75 p-1.5 text-center text-2xl font-bold text-white max-lg:text-lg max-md:text-[16px]">
        {card.title}
      </h6>
    </div>
  );
});
