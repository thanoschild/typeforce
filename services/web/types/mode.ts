import { modes, timeOptions, wordOptions } from "@/constants";

export type ModeType = typeof modes[number];
export type Mode = (typeof modes)[number];
export type TimeOptionType = typeof timeOptions[number];
export type WordOptionType = typeof wordOptions[number];
export type ModeOptionType = TimeOptionType | WordOptionType;

export function getModeOptions(mode: Mode) : ModeOptionType[] {
    switch (mode) {
        case "words":
            return wordOptions;
        case "time":
            return timeOptions;
        default:
            return []
    }
}