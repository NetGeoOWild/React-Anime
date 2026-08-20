import { useAnimeList } from "@/hooks/useAnimeList";
import { Button } from "../../common/Button";
import { AnimeCardPreview } from "../../anime/AnimeCardPreview";
import { useEffect, useRef } from "react";
import { Loader } from "../../common/Loader";
import { Error } from "../../common/Error";
import { AnimeCardPreviewSkeleton } from "../../anime/AnimeCardPreviewSkeleton";
import { Link } from "react-router";

export function Anime() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const shouldScroll = useRef(false);
  const prevDataLength = useRef(0);

  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
    isFetchNextPageError,
    isPending,
  } = useAnimeList();

  const animeList = data?.pages.flatMap((page) => page.data);

  async function handleLoadMore() {
    prevDataLength.current = animeList?.length ?? 0;
    shouldScroll.current = true;

    await fetchNextPage();
  }

  useEffect(() => {
    if (!shouldScroll.current) return;

    const currListLength = animeList?.length ?? 0;

    if (currListLength > prevDataLength.current) {
      requestAnimationFrame(() => {
        bottomRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }

    prevDataLength.current = currListLength;
  }, [animeList?.length]);

  if (isPending) {
    return <AnimeCardPreviewSkeleton />;
  }

  if (isError && !data) {
    return <Error message={error.message} />;
  }

  if (!animeList || animeList.length === 0) {
    return <Error message="No anime found" />;
  }

  return (
    <div>
      <h4 className="mb-3.5 text-4xl max-lg:text-3xl max-md:text-2xl max-sm:text-xl">
        Anime
      </h4>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {animeList?.map((card) => {
          return (
            <Link to={`/anime/${card.mal_id}`} key={card.mal_id}>
              <AnimeCardPreview card={card} />
            </Link>
          );
        })}
      </div>

      <div ref={bottomRef}></div>

      {isFetchingNextPage && <Loader />}

      {isFetchNextPageError && (
        <Error message="Could not load more, try later" />
      )}

      <div className="mx-auto mb-40 w-full max-w-75 pt-12.5 text-center">
        <Button
          fill={false}
          text={"View More"}
          onClick={handleLoadMore}
          disabled={!hasNextPage}
        />
      </div>
    </div>
  );
}
