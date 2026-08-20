import { Route, Routes } from "react-router";
import { MainLayout } from "./components/layout/MainLayout";
import { Home } from "./components/layout/Home/Home";
import { AnimeDetails } from "./components/pages/anime/AnimeDetails";
import { AnimeGenreOrSearch } from "./components/layout/Anime/AnimeGenreOrSearch";
import { AuthLayout } from "./components/layout/Auth/AuthLayout";
import { Login } from "./components/pages/auth/Login";
import { Register } from "./components/pages/auth/Register";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="anime/:id" element={<AnimeDetails />} />
        <Route path="anime" element={<AnimeGenreOrSearch />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}
