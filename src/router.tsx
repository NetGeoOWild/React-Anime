import { Route, Routes } from "react-router";
import { Layout } from "./components/layout/Layout";
import { Home } from "./components/layout/Home/Home";
import { AnimeDetails } from "./components/anime/AnimeDetails";
import { AnimeGenreOrSearch } from "./components/layout/Anime/AnimeGenreOrSearch";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="anime/:id" element={<AnimeDetails />} />
        <Route path="anime" element={<AnimeGenreOrSearch />} />
      </Route>
    </Routes>
  );
}
