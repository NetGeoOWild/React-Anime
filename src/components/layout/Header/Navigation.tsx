import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAnimeGenresList } from "@/hooks/useAnimeGenresList";
import { useState } from "react";
import { Link } from "react-router";

export function Navigation() {
  const [value, setVaule] = useState("");
  const { data, isError, isLoading } = useAnimeGenresList();

  return (
    <NavigationMenu align="end" value={value} onValueChange={setVaule}>
      <NavigationMenuList className="gap-2.5">
        <NavigationMenuItem>
          <Link
            to="/"
            className="dark:hover:bg-my-accent/50 hover:bg-light-theme/50 cursor-pointer rounded-[6px] px-2 py-1 text-2xl text-black duration-300 max-xl:text-lg dark:text-white"
          >
            Home
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="cursor-pointer text-2xl font-normal text-black max-xl:text-lg dark:text-white">
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent className="dark:border-my-accent/50 border-light-theme/50 max-h-50 overflow-y-scroll rounded-[5px] border-2 bg-white dark:bg-black">
            <ul className="flex w-56 flex-col gap-2">
              {isLoading && <li>Loading genres...</li>}

              {isError && <li>Genres unavailable</li>}

              {data?.genres.map((genre) => {
                return (
                  <li key={genre}>
                    <Link
                      onClick={() => setVaule("")}
                      to={`/anime?genre=${encodeURIComponent(genre)}`}
                      className="dark:hover:bg-my-accent/50 hover:bg-light-theme/50 block text-center text-black duration-300 dark:text-white"
                    >
                      {genre}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
