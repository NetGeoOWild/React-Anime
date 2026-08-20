import { Anime } from "@/components/pages/anime/Anime";
import { AnimeHighlights } from "@/components/pages/anime/AnimeHighlights";

export function Home() {
  return (
    <>
      <AnimeHighlights />
      <Anime />
    </>
  );
}
