import type {
  AnimeCardListPreview,
  AnimeCardPreview,
  AnimeDescription,
  AnimeGenres,
} from "@/types/anime";
import type {
  AnilistResponseFavorites,
  AnimeCardFavoritesPreview,
} from "@/types/animeFavorites";
import type { AnilistGenresListResponse } from "@/types/animeGenresList";
import type { AnilistAnimeByIdResponse } from "@/types/animeInfo";
import type { AnilistResponseList } from "@/types/animeList";
import type { AnilistResponse } from "@/types/animeTop";

const apiUrl = "https://graphql.anilist.co";

export async function getTopAnime(): Promise<AnimeCardPreview[]> {
  const variables = {
    perPage: 5,
    type: "ANIME",
    sort: ["POPULARITY_DESC"],
  };

  const queryQl = `
  query Page($perPage: Int, $type: MediaType, $sort: [MediaSort]) {
  Page(perPage: $perPage) {
    media(sort: $sort, type: $type) {
      idMal
      title {
        english
        romaji
      }
      coverImage {
        large
      }
    }
  }
}
  `;

  const response = await fetch(`${apiUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: queryQl,
      variables: variables,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch anime");
  }

  const responseData: { data: AnilistResponse } = await response.json();

  return responseData.data.Page.media.map((anime) => {
    return {
      mal_id: anime.idMal,
      image: anime.coverImage.large,
      title: anime.title.english ?? anime.title.romaji,
    };
  });
}

export async function getAnimeList(page = 1): Promise<AnimeCardListPreview> {
  const variables = {
    page,
    perPage: 25,
    type: "ANIME",
  };

  const queryQl = `
  query Query($page: Int, $perPage: Int, $type: MediaType) {
  Page(page: $page, perPage: $perPage) {
    media(type: $type) {
      idMal
      title {
        english
        romaji
      }
      coverImage {
        large
      }
    }
    pageInfo {
      currentPage
      hasNextPage
      lastPage
      perPage
      total
    }
  }
}`;

  const response = await fetch(`${apiUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: queryQl,
      variables: variables,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch anime");
  }

  const responseData: AnilistResponseList = await response.json();

  const responsePage = responseData.data.Page;

  return {
    data: responsePage.media.map((anime) => {
      return {
        mal_id: anime.idMal,
        image: anime.coverImage.large,
        title: anime.title.english ?? anime.title.romaji,
      };
    }),

    pageInfo: responsePage.pageInfo,
  };
}

export async function getAnime(animeId: string): Promise<AnimeDescription> {
  const variables = {
    idMal: animeId,
    type: "ANIME",
    asHtml: true,
  };

  const queryQl = `query Query($idMal: Int, $type: MediaType, $asHtml: Boolean) {
    Media(idMal: $idMal, type: $type) {
      coverImage {
        extraLarge
      }
      description(asHtml: $asHtml)
      episodes
      averageScore
      duration
      genres
      isAdult
      title {
        romaji
        english
      }
      studios {
        nodes {
          name
        }
      }
     status
      startDate {
        day
        month
        year
      }
      season
      format
    }
  }`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: queryQl,
      variables: variables,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch anime");
  }

  const responseData: AnilistAnimeByIdResponse = await response.json();

  const anime = responseData.data.Media;

  return {
    ...anime,
    image: anime.coverImage.extraLarge,
    title: anime.title.english ?? anime.title.romaji,
    studios: anime.studios.nodes.map((s) => s.name),
    year: anime.startDate.year,
    startDate: new Date(
      anime.startDate.year,
      anime.startDate.month - 1,
      anime.startDate.day,
    ).toLocaleDateString("ru-RU"),
  };
}

export async function getAnimeBySearch(
  page = 1,
  search: string,
): Promise<AnimeCardListPreview> {
  const variables = {
    page,
    perPage: 25,
    search,
    type: "ANIME",
  };

  const queryQl = `query Page($page: Int, $perPage: Int, $search: String, $type: MediaType) {
  Page(page: $page, perPage: $perPage) {
    media(search: $search, type: $type) {
      idMal
      coverImage {
        large
      }
      title {
        english
        romaji
      }
    }
    pageInfo {
      currentPage
      hasNextPage
      lastPage
      perPage
      total
    }
  }
}`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      variables,
      query: queryQl,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch anime");
  }

  const responseData: AnilistResponseList = await response.json();

  const responsePage = responseData.data.Page;

  return {
    data: responsePage.media.map((anime) => {
      return {
        mal_id: anime.idMal,
        image: anime.coverImage.large,
        title: anime.title.english ?? anime.title.romaji,
      };
    }),

    pageInfo: responsePage.pageInfo,
  };
}

export async function getAnimeGenres(): Promise<AnimeGenres> {
  const queryQl = `query Query {
                      GenreCollection
                    }`;
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: queryQl,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch genres");
  }

  const responseData: AnilistGenresListResponse = await response.json();

  return {
    genres: responseData.data.GenreCollection,
  };
}

export async function getAnimeListByGenre(
  page = 1,
  genre: string,
): Promise<AnimeCardListPreview> {
  const variables = {
    page,
    perPage: 25,
    type: "ANIME",
    genre,
  };

  const queryQl = `
  query Query($page: Int, $perPage: Int, $type: MediaType, $genre: String) {
  Page(page: $page, perPage: $perPage) {
    media(type: $type, genre: $genre) {
      idMal
      title {
        english
        romaji
      }
      coverImage {
        large
        }
      }
      pageInfo {
      currentPage
      hasNextPage
      lastPage
      perPage
      total
      }
    }
  }`;

  const response = await fetch(`${apiUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: queryQl,
      variables: variables,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch anime");
  }

  const responseData: AnilistResponseList = await response.json();

  const responsePage = responseData.data.Page;

  return {
    data: responsePage.media.map((anime) => {
      return {
        mal_id: anime.idMal,
        image: anime.coverImage.large,
        title: anime.title.english ?? anime.title.romaji,
      };
    }),

    pageInfo: responsePage.pageInfo,
  };
}

export async function getAnimeFavorites(
  ids: number[],
): Promise<AnimeCardFavoritesPreview> {
  const variables = {
    ids,
  };

  const queryQl = `query ($ids: [Int]) {
   Page {
      media(idMal_in: $ids, type: ANIME) {
        idMal
        title {
        english
        romaji
        }
        coverImage {
        large
        }
      }
    }
  }`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: queryQl,
      variables: variables,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch anime");
  }

  const responseData: AnilistResponseFavorites = await response.json();

  const responsePage = responseData.data.Page;

  return {
    data: responsePage.media.map((anime) => {
      return {
        mal_id: anime.idMal,
        image: anime.coverImage.large,
        title: anime.title.english ?? anime.title.romaji,
      };
    }),
  };
}
