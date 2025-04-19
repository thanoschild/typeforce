import { forwardRef, memo } from 'react';
import { twJoin } from 'tailwind-merge';
import { Letter } from './Letter';

interface WordProps {
  letters: Array<{
    original: string;
    typed: string;
    isCorrect: boolean;
  }>;
  letterRef: React.RefObject<HTMLSpanElement | null>;
  error: boolean;
  lastTypedIndex?: number;
}

export const Word = memo(
  forwardRef<HTMLDivElement, WordProps>(function Word(
    { letters, letterRef, error, lastTypedIndex, ...settings },
    ref,
  ) {
    return (
      <div className={twJoin('m-[.25em] flex border-b-2', error ? 'border-colorful-error' : 'border-transparent')}>
        {letters.map((letter, index) => (
          <Letter
            key={`${letter.original}-${index}`}
            ref={ref !== null && lastTypedIndex === index ? letterRef : null}
            {...letter}
            {...settings}
          />
        ))}
      </div>
    );
  }),
); 