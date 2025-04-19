import { Language } from '../types/language';

export function getRandomWords(count: number, language: Language, lastWord?: string) {
  const words: string[] = [];
  while (words.length < count) {
    const randomIndex = Math.floor(Math.random() * language.words.length);
    const word = language.words[randomIndex];
    if (word !== (words.at(-1) ?? lastWord)) {
      words.push(word);
    }
  }
  return words;
}

export function parseWords(words: string[]) {
  return words.map((word) => ({
    original: word,
    letters: word.split('').map((char) => ({
      original: char,
      typed: '',
      isCorrect: true,
    })),
    isCorrect: true,
  }));
} 