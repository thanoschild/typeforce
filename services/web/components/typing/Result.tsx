import React from 'react'

export type ResultProps = {
    wpm: number;
    accuracy: number;
    time: number;
    wpmData: { time: number; wpm: number }[];
    onRestart: () => void;
    mode: string;
    modeOption: number;
  };
  

export default function Result({
    wpm,
    accuracy,
    time,
    wpmData,
    onRestart,
    mode,
    modeOption,
}: ResultProps) {
  return (
    <div>Result</div>
  )
}