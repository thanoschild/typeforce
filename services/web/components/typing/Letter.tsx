import { forwardRef } from 'react';
import { twJoin } from 'tailwind-merge';

interface LetterProps {
  original: string;
  typed: string;
  isCorrect: boolean;
}

export const Letter = forwardRef<HTMLSpanElement, LetterProps>(function Letter(
  { original, typed, isCorrect },
  ref,
) {
  return (
    <span
      ref={ref}
      className={twJoin(
        'relative',
        !typed && 'text-colorful-text',
        typed && isCorrect && 'text-colorful-correct',
        typed && !isCorrect && 'text-colorful-error',
      )}
    >
      {typed || original}
    </span>
  );
}); 