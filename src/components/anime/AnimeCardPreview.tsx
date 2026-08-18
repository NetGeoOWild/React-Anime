import type { AnimeCardPreview } from "@/types/anime";

type Props = {
  card: AnimeCardPreview;
};

export function AnimeCardPreview({ card }: Props) {
  return (
    <div className="relative aspect-3/4 overflow-hidden rounded-lg">
      <img
        src={card.image}
        alt={card.title}
        className="h-full w-full object-cover"
      />

      <h6 className="absolute bottom-6.25 left-1/2 -translate-x-1/2 rounded-[5px] bg-black/75 p-1.5 text-center text-2xl font-bold text-white max-lg:text-lg max-md:text-[16px]">
        {card.title}
      </h6>
    </div>
  );
}
