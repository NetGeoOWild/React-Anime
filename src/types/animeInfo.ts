type AnilistCoverImage = {
  extraLarge: string;
};

type AnilistTitle = {
  english: string | null;
  romaji: string;
};

type AnilistStudios = {
  name: string;
};

type AnilistStartDate = {
  day: number;
  month: number;
  year: number;
};

type AnilistAnimeById = {
  coverImage: AnilistCoverImage;
  description: string;
  episodes: number;
  averageScore: number;
  duration: number;
  genres: string[];
  isAdult: boolean;
  title: AnilistTitle;
  studios: {
    nodes: AnilistStudios[];
  };
  status: string;
  startDate: AnilistStartDate;
  season: string;
  format: string;
};

export type AnilistAnimeByIdResponse = {
  data: {
    Media: AnilistAnimeById;
  };
};
