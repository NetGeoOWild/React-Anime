import { Outlet } from "react-router";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";

export function MainLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
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
