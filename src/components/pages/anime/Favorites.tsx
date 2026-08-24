import { AnimeCardPreview } from "../../anime/AnimeCardPreview";
import { Error } from "../../common/Error";
import { Link } from "react-router";
import { useAnimeFavorites } from "@/hooks/useAnimeFavorites";
import { useAuthStore } from "@/store/authStore";
import { useUserFavorites } from "@/hooks/useUserFavorites";
import { AnimeFavoritesPreviewSkeleton } from "@/components/anime/AnimeFavoritesPreviewSkeleton";

export function Favorites() {
  const authStore = useAuthStore();

  const {
    data: favoritesId,
    isPending: isFavoritesPending,
    isError: isFavoritesError,
    error: favoritesError,
  } = useUserFavorites(authStore.user?.id ?? null);

  const malIds = favoritesId?.map((favorite) => favorite.mal_id) ?? [];

  const {
    data: favoriteList,
    isPending: isAnimePending,
    isError: isAnimeError,
    error: animeError,
  } = useAnimeFavorites(authStore.user?.id ?? null, malIds);

  if (isFavoritesPending) {
    return <AnimeFavoritesPreviewSkeleton />;
  }

  if (isFavoritesError) {
    return <Error message={favoritesError.message} />;
  }

  if (malIds.length === 0) {
    return <Error message="Favorite list is empty" />;
  }

  if (isAnimePending) {
    return <AnimeFavoritesPreviewSkeleton />;
  }

  if (isAnimeError) {
    return <Error message={animeError.message} />;
  }

  return (
    <div className="py-10">
      <h4 className="mb-3.5 text-4xl max-lg:text-3xl max-md:text-2xl max-sm:text-xl">
        Favorites
      </h4>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favoriteList.data?.map((card) => {
          return (
            <Link to={`/anime/${card.mal_id}`} key={card.mal_id}>
              <AnimeCardPreview card={card} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
