import { addFavorites, removeFavorites } from "@/api/userApi";
import { AnimeDetailsSkeleton } from "@/components/anime/AnimeDetailsSkeleton";
import { ButtonWithIcon } from "@/components/common/ButtonWithIcon";
import { Error } from "@/components/common/Error";
import { useAnimeById } from "@/hooks/useAnimeById";
import { useUserFavorites } from "@/hooks/useUserFavorites";
import { useAuthStore } from "@/store/authStore";
import { useQueryClient } from "@tanstack/react-query";
import { CircleChevronLeftIcon, Heart } from "lucide-react";
import { useNavigate, useParams } from "react-router";

export function AnimeDetails() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data, isLoading, isError, error } = useAnimeById(id!);
  const navigate = useNavigate();

  const authStore = useAuthStore();
  const { data: favoritesId } = useUserFavorites(authStore.user?.id ?? null);

  const isFavorite = favoritesId?.some(
    (favorite) => favorite.mal_id === Number(id),
  );

  async function favoriteHandler(e: React.MouseEvent<SVGElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (!isFavorite) {
      await addFavorites(Number(id), authStore.user!.id);
    } else {
      await removeFavorites(Number(id));
    }

    await queryClient.invalidateQueries({
      queryKey: ["user-favorites", authStore.user!.id],
    });
  }

  if (isLoading) {
    return <AnimeDetailsSkeleton />;
  }

  if (isError) {
    return <Error message={error.message} />;
  }

  if (!data) {
    return <Error message="No anime info, try later" />;
  }

  return (
    <div className="pt-10">
      <div className="py-17.5">
        <div className="flex flex-col justify-center gap-5 py-5 lg:flex-row">
          <div className="relative max-lg:mx-auto max-lg:max-w-117.5">
            <img
              className="h-full w-full overflow-hidden rounded-lg object-cover"
              src={data?.image}
              alt={data?.title}
            />
            {authStore.session && (
              <Heart
                className={`dark:text-my-accent/70 text-light-theme/70 absolute top-2.5 right-2.5 z-25 size-7 cursor-pointer transition-all duration-300 hover:scale-[1.2] ${isFavorite ? "dark:fill-my-accent dark:text-my-accent fill-light-theme text-light-theme" : "fill-white"}`}
                onClick={favoriteHandler}
              />
            )}
            <span className="dark:bg-my-accent bg-light-theme absolute top-3 left-3 flex h-15 w-15 items-center justify-center rounded-full font-bold">
              {data?.averageScore}/100
            </span>
          </div>
          <div className="dark:bg-my-accent/30 bg-light-theme/30 relative basis-1/2 rounded-lg p-2.5">
            <ButtonWithIcon
              className="dark:bg-my-accent bg-light-theme absolute -top-15 right-0 z-50 rounded-full text-black max-lg:fixed max-lg:top-20 max-lg:right-9 dark:text-white"
              icon={CircleChevronLeftIcon}
              onClick={() => navigate(-1)}
            />
            <h5 className="mb-5 text-2xl font-bold">{data?.title}</h5>
            <ul className="mb-5 space-y-2.5">
              <li>
                <b>Year of manufacture</b>: {data?.startDate}
              </li>
              <li>
                <b>Season</b>: {data?.season}
              </li>
              <li>
                <b>Genre</b>:{" "}
                {data?.genres.map((g, index) => {
                  if (index !== data.genres.length - 1) {
                    return `${g}, `;
                  } else {
                    return `${g}.`;
                  }
                })}
              </li>
              <li>
                <b>Category</b>: {data?.format}.
              </li>
              <li>
                <b>Episodes</b>: {data?.episodes}.
              </li>
              <li>
                <b>Duration of a single episode</b>: {data?.duration} min.
              </li>
              <li>
                <b>Age restriction</b>: {data?.isAdult ? "18+!" : "All ages."}
              </li>
              <li>
                <b>Studio</b>:{" "}
                {data?.studios.map((s, index) => {
                  if (index !== data.studios.length - 1) {
                    return `${s}, `;
                  } else {
                    return `${s}.`;
                  }
                })}
              </li>
              <li>
                <b>Status</b>: {data?.status}.
              </li>
            </ul>
            <span className="mb-1.25 block font-bold">Description:</span>
            <div
              dangerouslySetInnerHTML={{ __html: data?.description ?? "" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
