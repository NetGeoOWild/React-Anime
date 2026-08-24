import type { AnimeCardPreview } from "./anime";
import type { AnilistMedia } from "./animeList";

export type AnimeCardFavoritesPreview = {
  data: AnimeCardPreview[];
};

export type AnilistResponseFavorites = {
  data: {
    Page: {
      media: AnilistMedia[];
    };
  };
};
