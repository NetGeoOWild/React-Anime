import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

type Props = {
  toggleMenu?: () => void;
};

export function SearchInput({ toggleMenu }: Props) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const value = search.trim();

    if (!value) return;

    navigate(`/anime?search=${encodeURIComponent(value)}`);

    setSearch("");

    if (toggleMenu) {
      toggleMenu();
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="search" className="relative">
        <Search className="dark:stroke-my-accent stroke-light-theme absolute -top-0.5 left-2.5 z-999 max-xl:top-0.5 max-xl:left-3.5 max-xl:h-4.5 max-xl:w-4.5" />

        <input
          id="search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="dark:focus:ring-my-accent focus:ring-light-theme relative rounded-[5px] bg-mist-600 py-3.25 pr-5.75 pl-9.5 text-white placeholder:text-white focus:ring-2 focus:outline focus:outline-none max-xl:py-2.25 max-xl:text-sm dark:bg-[#302D2D] dark:placeholder:text-[#E5E5E5]"
        />
      </label>
    </form>
  );
}
