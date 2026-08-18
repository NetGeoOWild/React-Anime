import { AnimeBySearch } from "@/components/anime/AnimeBySearch";
import { AnimeGenre } from "@/components/anime/AnimeGenre";
import { useSearchParams } from "react-router";

export function AnimeGenreOrSearch() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const genre = searchParams.get("genre");

  if (search) {
    return <AnimeBySearch />;
  }

  if (genre) {
    return <AnimeGenre />;
  }
}
