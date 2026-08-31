import { Outlet } from "react-router";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";

export function MainLayout() {
  return (
    <div className="flex flex-col bg-mist-400/50 dark:bg-black/50">
      <Header />
      <main className="flex-1">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
