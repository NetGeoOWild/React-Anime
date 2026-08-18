type AnilistCoverImage = {
  large: string;
};

type AnilistTitle = {
  english: string | null;
  romaji: string;
};

type AnilistMedia = {
  idMal: number;
  title: AnilistTitle;
  coverImage: AnilistCoverImage;
};

type AnilistPageInfo = {
  currentPage: number;
  hasNextPage: boolean;
  lastPage: number;
  perPage: number;
  total: number;
};

export type AnilistResponseList = {
  data: {
    Page: {
      media: AnilistMedia[];
      pageInfo: AnilistPageInfo;
    };
  };
};
