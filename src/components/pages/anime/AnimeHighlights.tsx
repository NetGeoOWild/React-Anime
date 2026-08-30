import { Error } from "../../common/Error";
import { AnimeHighlightsCard } from "../../anime/AnimeHighlightsCard";
import { useTopAnime } from "@/hooks/useTopAnime";
import { AnimeHighlightsCardSkeleton } from "../../anime/AnimeHighlightsCardSkeleton";
import { Link } from "react-router";

export function AnimeHighlights() {
  const { data, isLoading, isError, error } = useTopAnime();

  if (isLoading) {
    return <AnimeHighlightsCardSkeleton />;
  }

  if (isError) {
    return <Error message={error.message} />;
  }

  if (!data || data.length === 0) {
    return <Error message="No anime found, try later" />;
  }

  const bigCard = data[0];
  const smallCards = data.slice(1, 5);

  return (
    <div className="py-12.5">
      <h4 className="mb-3.5 text-4xl text-black max-lg:text-3xl max-md:text-2xl max-sm:text-xl dark:text-white">
        Top-5
      </h4>

      <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-1">
        <div className="col-span-2 row-span-2 max-lg:col-span-1 max-lg:row-span-1">
          <Link to={`/anime/${bigCard.mal_id}`}>
            <AnimeHighlightsCard className="h-full" card={bigCard} />
          </Link>
        </div>

        {smallCards.map((anime) => (
          <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`}>
            <AnimeHighlightsCard card={anime} />
          </Link>
        ))}
      </div>
    </div>
  );
}
