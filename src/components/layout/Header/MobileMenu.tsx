import { X } from "lucide-react";
import { Button } from "../../common/Button";
import { motion } from "motion/react";
import { MobileCategories } from "./MobileCategories";
import { Link, useNavigate } from "react-router";
import { SearchInput } from "./SearchInput";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { signOut } from "@/api/authApi";
import { toast } from "react-toastify";

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

  return (
    <>
      {/* Overlay */}
      <motion.div
        onClick={toggleMenu}
        className={`fixed inset-0 z-450 bg-white/15`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Menu */}
      <motion.div
        className={`after:bg-my-accent fixed top-0 right-0 z-500 flex h-dvh w-full max-w-70 flex-col bg-black p-2.5 after:absolute after:bottom-0 after:left-0 after:block after:h-1 after:w-full`}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        <div className="mb-2.5 flex items-center justify-between">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={toggleMenu} className="cursor-pointer">
            <X />
          </button>
        </div>

        {authStore.session && (
          <span className="mb-5 block text-left text-lg text-white">
            <span>Hello</span>: {authStore.user?.email}
          </span>
        )}

        <SearchInput toggleMenu={toggleMenu} />

        <div className="flex flex-1 flex-col justify-between">
          <div className="pt-3.75">
            <Link to="/" className="block p-1.5 text-lg" onClick={toggleMenu}>
              Home
            </Link>
            <MobileCategories toggleMenu={toggleMenu} />
          </div>

          {!authStore.session && (
            <div className="flex flex-col gap-3.75 pb-3.75">
              <Button fill={true} text="Sign up" />
              <Button fill={false} text="Sign in" />
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
