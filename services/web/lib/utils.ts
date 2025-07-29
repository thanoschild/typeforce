import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { generate } from "random-words";
import { Test } from "@prisma/client";
import { Word } from "@/types/words";

interface TestCountData {
  date: string;
  testCount: number;
}

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const generateRandomWords = (length: number) => {
  const words = generate({ exactly: length, join: " " });
  return words;
};

export function parseWords(words: string[]): Word[] {
  return words.map((word) => ({
    original: word,
    isCorrect: false,
    letters: word.split("").map((letter) => ({ original: letter })),
  }));
}

export const calculateWPM = (totalCharacters: number, timePassed: number) => {
  const minutes = timePassed / 60;
  const wordsTyped = totalCharacters / 5;

  if (minutes === 0 || totalCharacters === 0) return 0;

  const wpm = Number((wordsTyped / minutes).toFixed(2));
  return wpm;
};

export const calculateAccuracy = (userInput: string, text: string) => {
  if (userInput.length === 0) return 0;

  const correctChars = userInput
    .split("")
    .filter((char, index) => char === text[index]).length;
  const accuracy = (correctChars / userInput.length) * 100;

  return Number(accuracy.toFixed(2));
};

export const formatDate = (input: Date | string): string => {
  const date = new Date(input);
  if (isNaN(date.getTime())) return "Invalid Date";

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const getTestCountByDate = (tests: Test[]): TestCountData[] => {
  const countMap = tests.reduce((acc, test) => {
    const date = test.createdAt.toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(countMap)
    .map(([date, testCount]) => ({ date, testCount }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const generateRoomCode = () => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};