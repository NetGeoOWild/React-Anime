import { useState } from "react";
import { Button } from "../../common/Button";
import { Logo } from "../../common/Logo";
import { Navigation } from "./Navigation";
import { SearchInput } from "./SearchInput";
import { Menu } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { AnimatePresence } from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "@/store/authStore";
import { signOut } from "@/api/authApi";
import { toast } from "react-toastify";

export function Header() {
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const authStore = useAuthStore();
  const navigate = useNavigate();

  function handleToggleMenu() {
    setShowMenu((prev) => !prev);
  }

  async function handleLogOut() {
    setLoading(true);

    try {
      await signOut();
      toast.success("Logout successful!");
      authStore.setAuth(null, null);
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className="pt-9.5">
        <div className="container">
          <div className="flex items-center justify-between">
            <Logo />
            {!isMobile && (
              <div className="flex items-center gap-6.25">
                <Navigation />
                <SearchInput />

                {!authStore.session && (
                  <div className="flex items-center gap-6.25">
                    <Link to="/register">
                      <Button fill={true} text="Sign up" />
                    </Link>
                    <Link to="/login">
                      <Button fill={false} text="Sign in" />
                    </Link>
                  </div>
                )}
              </div>
            )}
            {!showMenu && (
              <Menu
                className="hidden cursor-pointer max-lg:block"
                onClick={handleToggleMenu}
              />
            )}
          </div>
        </div>
      </header>

      {authStore.session && !isMobile && (
        <div className="sticky top-0 z-50 container bg-black">
          <div className="flex items-center justify-between py-5">
            <span className="block text-left text-lg text-white">
              <span>Hello</span>: {authStore.user?.email}
            </span>
            <div className="flex items-center gap-6.25">
              <Link to="/favorites">
                <Button fill={true} text="Favorites" />
              </Link>
              <Button
                onClick={handleLogOut}
                fill={false}
                text={loading ? "Exit..." : "Log out"}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showMenu && <MobileMenu toggleMenu={handleToggleMenu} />}
      </AnimatePresence>
    </>
  );
}
