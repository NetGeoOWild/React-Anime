import { Logo } from "@/components/common/Logo";
import insta from "@/assets/images/insta.svg";
import facebook from "@/assets/images/facebook.svg";
import twitter from "@/assets/images/twitter.svg";

export function Footer() {
  return (
    <footer className="bg-[#161515]">
      <div className="container">
        <div className="flex items-center justify-between pt-8.75 max-sm:flex-wrap">
          <div className="max-sm:mb-8 max-sm:w-full">
            <Logo />
            <h6 className="font-aubrey pl-3 text-lg max-sm:text-sm">
              Welcome to the best anime site.
            </h6>
            <div className="max-w-92.5 pt-7.5">
              <p className="mb-1.25 text-sm">
                Animes Online — All rights reserved.
              </p>
              <p className="text-[12px]">
                Please note: this site does not host videos on its server. All
                content is provided by third parties and organizations
                unaffiliated with this site.
              </p>
            </div>
          </div>

          <div>
            <p className="mb-2.5 text-2xl capitalize max-xl:text-xl max-sm:text-lg">
              Social media
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2.5 text-lg max-sm:text-sm"
                >
                  <img
                    className="max-sm:h-5 max-sm:w-5"
                    src={insta}
                    alt="instagram"
                  />
                  <span>@anime_online</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2.5 text-lg max-sm:text-sm"
                >
                  <img
                    className="max-sm:h-5 max-sm:w-5"
                    src={facebook}
                    alt="instagram"
                  />
                  <span>@anime_online</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2.5 text-lg max-sm:text-sm"
                >
                  <img
                    className="max-sm:h-5 max-sm:w-5"
                    src={twitter}
                    alt="instagram"
                  />
                  <span>@anime_online</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mb-3 pt-8 text-[12px]">
          Copyright, DMCA, Terms of Use, Privacy Policy. All rights reserved,
          2026 — Watch anime online for free. The best anime, cartoons, and
          movies; watch your favorite anime (dubbed or subtitled) in HD quality.
          Favorite TV shows, dubbed anime, series, anime series, anime
          streaming, for anime fans, watch anime for free, anime sites,
          feature-length anime, anime episodes — thousands of titles.
        </p>
      </div>
    </footer>
  );
}
