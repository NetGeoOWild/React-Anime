import { X } from "lucide-react";
import { Button } from "../../common/Button";
import { motion } from "motion/react";
import { MobileCategories } from "./MobileCategories";
import { Link, useNavigate } from "react-router";
import { SearchInput } from "./SearchInput";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { signOut } from "@/api/authApi";
import { toast } from "react-toastify";
import { ThemeSwitch } from "@/components/common/ThemeSwitch";

type Props = {
  toggleMenu: () => void;
};

export function MobileMenu({ toggleMenu }: Props) {
  const authStore = useAuthStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {/* Overlay */}
      <motion.div
        onClick={toggleMenu}
        className="fixed inset-0 z-450 bg-black/65 dark:bg-white/65"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Menu */}
      <motion.div
        className={`dark:after:bg-my-accent after:bg-light-theme fixed top-0 right-0 z-500 flex h-svh w-full max-w-70 flex-col bg-mist-400 p-2.5 text-black after:absolute after:bottom-0 after:left-0 after:block after:h-1 after:w-full dark:bg-[#161515] dark:text-white`}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        <div className="mb-2.5 flex items-center justify-between">
          <h2 className="flex w-full max-w-53.25 items-center justify-between text-xl font-bold">
            Menu
            <ThemeSwitch />
          </h2>
          <button onClick={toggleMenu} className="cursor-pointer">
            <X />
          </button>
        </div>

        {authStore.session && (
          <span className="mb-5 block truncate text-left text-lg text-black dark:text-white">
            <span>Hello</span>: {authStore.user?.email}
          </span>
        )}

        <SearchInput toggleMenu={toggleMenu} />

        <div className="flex flex-1 flex-col justify-between">
          <div className="pt-3.75">
            <Link
              to="/"
              className="block p-1.5 text-lg text-black dark:text-white"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <MobileCategories toggleMenu={toggleMenu} />
          </div>

          {!authStore.session && (
            <div className="flex flex-col gap-3.75 pb-3.75">
              <Link to="/register" onClick={toggleMenu}>
                <Button fill={true} text="Sign up" />
              </Link>
              <Link to="/login" onClick={toggleMenu}>
                <Button fill={false} text="Sign in" />
              </Link>
            </div>
          )}

          {authStore.session && (
            <div className="flex flex-col gap-3.75 pb-3.75">
              <Link to="/favorites" onClick={toggleMenu}>
                <Button fill={true} text="Favorites" />
              </Link>
              <Button
                onClick={handleLogOut}
                fill={false}
                text={loading ? "Exit..." : "Log out"}
                disabled={loading}
              />
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
