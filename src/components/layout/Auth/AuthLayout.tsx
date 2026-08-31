import { Outlet } from "react-router";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import tyan_1 from "@/assets/images/tyan_1.gif";
import tyan_3 from "@/assets/images/tyan_3.gif";

export function AuthLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-mist-400/50 dark:bg-black/50">
      <Header />
      <main className="flex flex-1 items-center">
        <div className="container">
          <div className="grid grid-cols-3 place-items-center max-lg:mb-30 max-lg:grid-cols-1 max-lg:grid-rows-2">
            <img
              src={tyan_1}
              alt="gif"
              className="aspect-6/4 w-full max-w-75 overflow-hidden object-cover"
            />
            <Outlet />
            <img
              src={tyan_3}
              alt="gif"
              className="aspect-6/4 w-full max-w-75 overflow-hidden object-cover max-lg:hidden"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
