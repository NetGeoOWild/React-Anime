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
        <Search className="absolute -top-0.5 left-2.5 z-999 max-xl:top-0.5 max-xl:left-3.5 max-xl:h-4.5 max-xl:w-4.5" />

        <input
          id="search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="placeholder:text-[#E5E5E5]focus:outline focus:ring-my-accent relative rounded-[5px] bg-[#302D2D] py-3.25 pr-5.75 pl-9.5 text-white focus:ring-2 focus:outline-none max-xl:py-2.25 max-xl:text-sm"
        />
      </label>
    </form>
  );
}
