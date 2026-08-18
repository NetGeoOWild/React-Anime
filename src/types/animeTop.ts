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

export type AnilistResponse = {
  Page: {
    media: AnilistMedia[];
  };
};
