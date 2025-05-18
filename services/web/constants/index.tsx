import { LuCrown } from "react-icons/lu";
import { MdOutlineSettings } from "react-icons/md";
import { RiInformation2Line } from "react-icons/ri";
import { TbKeyboard } from "react-icons/tb";
import { LuSwords } from "react-icons/lu";

export const BRAND_NAME = "Typeforces";

export const modes = ["time", "words"];
export const timeOptions = [15, 30];
export const wordOptions = [10, 25, 50];

export const NaveLinks = [
      {
        label: "Home",
        href: "/",
        icon: <TbKeyboard className="text-xl text-theme-sub hover:text-theme-text" />,
      },
      {
        label: "Multiplayer",
        href: "/multiplayer",
        icon: (
          <LuSwords className="text-xl text-theme-sub hover:text-theme-text" />
        ),
      },
      {
        label: "Leaderboards",
        href: "/leaderboards",
        icon: <LuCrown className="text-xl text-theme-sub hover:text-theme-text" />,
      },
      {
        label: "About",
        href: "/about",
        icon: (
          <RiInformation2Line className="text-xl text-theme-sub hover:text-theme-text" />
        ),
      },
      {
        label: "Settings",
        href: "/settings",
        icon: (
          <MdOutlineSettings className="text-xl text-theme-sub hover:text-theme-text" />
        ),
      },
    ];


/*LINKS*/
if (!process.env.NEXT_PUBLIC_FRONTEND_URL) {
  throw new Error("NEXT_PUBLIC_FRONTEND_URL is not defined");
}
const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

export const DEFAULT_LOGIN_REDIRECT = "/account";
export const AUTH_LINK = FRONTEND_URL + "/auth";
export const AUTH_VERIFICATION_LINK = FRONTEND_URL + "/auth/verification";

export const USER_STATS_LINK = FRONTEND_URL + '/account'
export const USER_SETTING_LINK = FRONTEND_URL + '/account-settings'

export const WS_URL = process.env.NEXT_PUBLIC_WS_URL ?? "http://localhost:8080";