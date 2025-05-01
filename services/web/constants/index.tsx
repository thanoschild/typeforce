import { LuCrown } from "react-icons/lu";
import { MdOutlineSettings } from "react-icons/md";
import { RiInformation2Line } from "react-icons/ri";
import { TbKeyboard } from "react-icons/tb";

export const BRAND_NAME = "TurboType";

export const modes = ["time", "words"];
export const timeOptions = [15, 30];
export const wordOptions = [10, 25, 50];

export const NaveLinks = [
      {
        label: "Home",
        href: "/",
        icon: <TbKeyboard className="text-theme-sub hover:text-theme-text" />,
      },
      {
        label: "Leaderboards",
        href: "/leaderboards",
        icon: <LuCrown className="text-theme-sub hover:text-theme-text" />,
      },
      {
        label: "About",
        href: "/about",
        icon: (
          <RiInformation2Line className="text-theme-sub hover:text-theme-text" />
        ),
      },
      {
        label: "Settings",
        href: "/settings",
        icon: (
          <MdOutlineSettings className="text-theme-sub hover:text-theme-text" />
        ),
      },
    ];


/*LINKS*/
if (!process.env.NEXT_PUBLIC_FRONTEND_URL) {
  throw new Error("NEXT_PUBLIC_FRONTEND_URL is not defined");
}
const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

export const AUTH_LINK = FRONTEND_URL + "/auth";
export const AUTH_VERIFICATION_LINK = FRONTEND_URL + "/auth/verification";
export const DEFAULT_LOGIN_REDIRECT = "/account";
