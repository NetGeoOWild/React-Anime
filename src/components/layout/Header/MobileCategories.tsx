import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAnimeGenresList } from "@/hooks/useAnimeGenresList";
import { useState } from "react";
import { Link } from "react-router";

type Props = {
  toggleMenu: () => void;
};

export function MobileCategories({ toggleMenu }: Props) {
  const [activeItem, setActiveItem] = useState<string[]>([]);
  const { data, isError, isLoading } = useAnimeGenresList();

  function handleMenu() {
    setActiveItem([]);
    toggleMenu();
  }

  return (
    <Accordion value={activeItem} onValueChange={setActiveItem}>
      <AccordionItem>
        <AccordionTrigger className="aria-expanded:bg-my-accent/50 mb-2.5 p-1.5 text-lg">
          Categories
        </AccordionTrigger>

        <AccordionContent>
          <div className="flex max-h-60 w-56 flex-col gap-2 overflow-y-auto">
            {isLoading && <div>Loading genres...</div>}

            {isError && <div>Genres unavailable</div>}

            {data?.genres.map((genre) => {
              return (
                <Link
                  key={genre}
                  to={`/anime?genre=${encodeURIComponent(genre)}`}
                  className="hover:bg-my-accent/50 mb-2.5 block text-center text-lg text-white duration-300"
                  onClick={handleMenu}
                >
                  {genre}
                </Link>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
