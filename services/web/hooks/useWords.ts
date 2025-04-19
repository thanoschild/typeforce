import { useCallback } from 'react';
import { useTypingTest } from '@/context/TypingTestContext';
import { getRandomWords, parseWords } from '../utils/typingTest';

export function useWords() {
  const { language, setValues } = useTypingTest();

  const add = useCallback(
    (count: number) => {
      if (language) {
        setValues(({ words }) => {
          const lastWord = words.at(-1)?.original;
          const randomWords = getRandomWords(count, language, lastWord);
          const newWords = parseWords(randomWords);
          words.push(...newWords);
        });
      }
    },
    [language, setValues],
  );

  const update = useCallback(
    (input: string) => {
      setValues((draft) => {
        const { words, wordIndex } = draft;
        const word = words[wordIndex];
        
        if (!word) return;

        const letters = word.letters;
        const inputChars = input.split('');
        
        letters.forEach((letter, index) => {
          const inputChar = inputChars[index];
          letter.typed = inputChar || '';
          letter.isCorrect = inputChar === letter.original;
        });

        word.isCorrect = letters.every((letter) => letter.isCorrect);
      });
    },
    [setValues],
  );

  return { add, update };
} 