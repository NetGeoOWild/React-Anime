import { useState } from "react";
import { Button } from "../../common/Button";
import { Logo } from "../../common/Logo";
import { Navigation } from "./Navigation";
import { SearchInput } from "./SearchInput";
import { Menu } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { AnimatePresence } from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1023px)");

  function handleToggleMenu() {
    setShowMenu((prev) => !prev);
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
                <Button fill={true} text="Sign up" />
                <Button fill={false} text="Sign in" />
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

      <AnimatePresence>
        {showMenu && <MobileMenu toggleMenu={handleToggleMenu} />}
      </AnimatePresence>
    </>
  );
}
