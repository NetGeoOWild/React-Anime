import type { AnimeCardPreview } from "@/types/anime";
import { cn } from "@/lib/utils";
import { memo } from "react";

type Props = {
  card: AnimeCardPreview;
  className?: string;
};
export const AnimeHighlightsCard = memo(({ card, className }: Props) => {
  return (
    <div
      className={cn(
        "relative aspect-4/5 cursor-pointer overflow-hidden rounded-lg",
        className,
      )}
    >
      <img
        src={card.image}
        alt={card.title}
        className="h-full w-full object-cover"
      />

      <h6 className="absolute bottom-6.25 left-1/2 line-clamp-2 -translate-x-1/2 rounded-[5px] bg-black/75 p-1.5 text-center text-2xl font-bold text-white max-lg:text-lg max-md:text-[16px]">
        {card.title}
      </h6>
    </div>
  );
});
