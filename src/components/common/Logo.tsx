import logo from "@/assets/images/logo.svg";
import { Link } from "react-router";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <img
        src={logo}
        alt="logo"
        className="brightness-0 max-xl:h-8.75 max-xl:w-8.75 max-sm:h-6.25 max-sm:w-6.25 dark:invert"
      />
      <span className="font-aubrey text-5xl text-black max-xl:text-3xl max-sm:text-2xl dark:text-white">
        Anime Online
      </span>
    </Link>
  );
}
