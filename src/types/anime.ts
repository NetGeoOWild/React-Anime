export type AnimeCardPreview = {
  mal_id: number;
  image: string;
  title: string;
};

export type AnimeCardListPreview = {
  data: AnimeCardPreview[];
  pageInfo: {
    currentPage: number;
    hasNextPage: boolean;
    lastPage: number;
    perPage: number;
    total: number;
  };
};

export type AnimeDescription = {
  image: string;
  description: string;
  episodes: number;
  averageScore: number;
  duration: number;
  genres: string[];
  isAdult: boolean;
  title: string;
  studios: string[];
  status: string;
  startDate: string;
  year: number;
  season: string;
  format: string;
};

export type AnimeGenres = {
  genres: string[];
};
