import { LuCrown } from "react-icons/lu";
import { MdOutlineSettings } from "react-icons/md";
import { RiInformation2Line } from "react-icons/ri";
import { TbKeyboard } from "react-icons/tb";

export const modes = ["time", "words"];
export const timeOptions = [15, 30, 60];
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
