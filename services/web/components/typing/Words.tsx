import { useRef } from 'react';
import { useTypingTest } from '@/context/TypingTestContext';
import { useWords } from '../../hooks/useWords';
import { useDidMount, useDidUpdate } from '@/hooks/useLifecycle';
import { Word } from './Word';

export function Words() {
  const { words, wordIndex, inputValue, isTestRunning, mode, wordAmount } = useTypingTest();
  const wordsCollection = useWords();
  const wordsetRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLSpanElement>(null);
  const highestWordIndex = useRef(0);

  useDidMount(() => {
    wordsCollection.add(mode === 'words' && wordAmount ? wordAmount : 100);
  });

  useDidUpdate(() => {
    if (wordIndex > highestWordIndex.current) {
      if (mode === 'time' || words.length < (wordAmount || Number.POSITIVE_INFINITY))
        wordsCollection.add(1);
      highestWordIndex.current = wordIndex;
    }
  }, [wordIndex]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isTestRunning) return;
    const value = e.target.value;
    wordsCollection.update(value);
  };

  return (
    <div className='relative leading-none'>
      <input
        onChange={handleInput}
        value={inputValue}
        className='absolute opacity-0'
        autoFocus
      />
      <div ref={wordsetRef} className='flex flex-wrap'>
        {words.map(({ isCorrect, letters }, index) => (
          <Word
            key={`${letters[0].original}-${index}`}
            ref={wordIndex === index ? wordRef : null}
            letters={letters}
            letterRef={letterRef}
            error={wordIndex > index && !isCorrect}
            lastTypedIndex={wordIndex === index ? inputValue.length - 1 : undefined}
          />
        ))}
      </div>
    </div>
  );
} 