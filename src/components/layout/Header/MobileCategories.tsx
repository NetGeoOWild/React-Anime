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
        <AccordionTrigger className="dark:aria-expanded:bg-my-accent/50 aria-expanded:bg-light-theme/50 mb-2.5 p-1.5 text-lg font-normal text-black dark:text-white">
          Categories
        </AccordionTrigger>

        <AccordionContent>
          <div className="dark:border-my-accent/50 border-light-theme/50 flex max-h-50 flex-col gap-2 overflow-y-auto rounded-[5px] border-2 bg-white text-black dark:bg-black dark:text-white">
            {isLoading && (
              <div className="text-black dark:text-white">
                Loading genres...
              </div>
            )}

            {isError && (
              <div className="text-black dark:text-white">
                Genres unavailable
              </div>
            )}

            {data?.genres.map((genre) => {
              return (
                <Link
                  key={genre}
                  to={`/anime?genre=${encodeURIComponent(genre)}`}
                  className="dark:hover:bg-my-accent/50 hover:bg-light-theme/50 mb-2.5 block text-center text-lg text-black duration-300 dark:text-white"
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
