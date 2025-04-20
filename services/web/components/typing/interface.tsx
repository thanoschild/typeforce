"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { calculateAccuracy, calculateWPM, cn } from "@/utils/setting";
import { generateRandomWords } from "@/utils/setting";
import Characters, { Character } from "./Characters";
import Result from "./Result";
import Modes from "./Modes";

export default function Interface() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [mistakes, setMistakes] = useState<number[]>([]);
  const [caretPosition, setCaretPosition] = useState({ top: 0, left: 0 });
  const [isUserTyping, setIsUserTyping] = useState<boolean>(false);

  const [mode, setMode] = useState<string>("words");
  const [modeOption, setModeOption] = useState<number>(5);

  const [timePassed, setTimePassed] = useState<number>(0);
  const [timeStarted, setTimeStarted] = useState<boolean>(false);
  const [raceStarted, setRaceStarted] = useState<boolean>(false);
  const [raceCompleted, setRaceCompleted] = useState<boolean>(false);

  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [wpmData, setWpmData] = useState<{ time: number; wpm: number }[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const generateNewText = useCallback(() => {
    let newText;
    if (mode === "words") {
      newText = generateRandomWords(Number(modeOption));
    } else if (mode === "time") {
      newText = generateRandomWords(Number(modeOption * 2));
    } else {
      newText = "This is a placeholder text.";
    }
    setText(newText);
  }, [mode, modeOption]);

  const resetTest = useCallback(() => {
    generateNewText();
    setCurrentIndex(0);
    setUserInput("");
    setTimePassed(0);
    setTimeStarted(false);
    setRaceStarted(false);
    setRaceCompleted(false);
    setWpmData([]);
    setMistakes([]);
    if (inputRef.current) inputRef.current.focus();
    setCaretPosition({ top: 0, left: 0 });
  }, [generateNewText]);

  useEffect(() => {
    generateNewText();
    resetTest();
  }, [mode, modeOption, generateNewText, resetTest]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
        resetTest();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [resetTest]);

  const updateCaretPosition = useCallback(() => {
    if (currentIndex >= 0 && currentIndex < charRefs.current.length) {
      const currentChar = charRefs.current[currentIndex];
      const currentRef = containerRef.current;
      if (currentChar && currentRef) {
        const containerRect = currentRef.getBoundingClientRect();
        const charRect = currentChar.getBoundingClientRect();

        setCaretPosition({
          top: charRect.top - containerRect.top,
          left: charRect.left - containerRect.left,
        });
      }
    }
  }, [currentIndex]);

  useEffect(() => {
    updateCaretPosition();
  }, [currentIndex, updateCaretPosition]);

  useEffect(() => {
    const handleResize = () => {
      updateCaretPosition();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateCaretPosition]);

  useEffect(() => {
    if (userInput.length === 1 && !timeStarted) {
      setRaceStarted(true);
      setTimeStarted(true);
    }
  }, [userInput, timeStarted]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (timeStarted && !raceCompleted) {
      timer = setInterval(() => {
        setTimePassed((prev) => {
          const newTime = prev + 1;
          if (mode === "time" && newTime >= modeOption) {
            return modeOption;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timeStarted, raceCompleted, mode, modeOption]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (raceCompleted) return;

    const newInput = e.target.value;
    setUserInput(newInput);

    if (newInput.length < userInput.length) {
      setMistakes((prev) => prev.filter((index) => index !== newInput.length));
    } else if (newInput.length > 0) {
      const lastCharIndex = newInput.length - 1;
      if (newInput[lastCharIndex] !== text[lastCharIndex]) {
        setMistakes((prev) => [...prev, lastCharIndex]);
      }
    }

    if (mode === "time" && timePassed >= modeOption) {
      completeTest();
      return;
    }

    if (newInput.length === text.length) {
      completeTest();
    } else {
      setCurrentIndex(newInput.length);
    }
  };

  const completeTest = () => {
    setRaceStarted(false);
    setTimeStarted(false);
    setRaceCompleted(true);

    const finalWpm = calculateWPM(userInput.length, timePassed);
    const finalAccuracy = calculateAccuracy(userInput, text);

    setWpm(finalWpm);
    setAccuracy(finalAccuracy);

    setWpmData((prev) => {
      const lastEntry = prev[prev.length - 1];
      if (!lastEntry || lastEntry.time !== timePassed) {
        return [...prev, { time: timePassed, wpm: finalWpm }];
      }
      return prev;
    });

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (raceStarted && timePassed > 0) {
      const currentWpm = calculateWPM(userInput.length, timePassed);
      setWpmData((prev) => {
        const lastEntry = prev[prev.length - 1];
        if (
          !lastEntry ||
          lastEntry.wpm !== currentWpm ||
          lastEntry.time !== timePassed
        ) {
          return [...prev, { time: timePassed, wpm: currentWpm }];
        }
        return prev;
      });
    }
  }, [timePassed, raceStarted, userInput.length]);

  const characters: Character[] = useMemo(() => {
    return text.split("").map((char, index) => ({
      char,
      status:
        index < currentIndex
          ? mistakes.includes(index)
            ? "error"
            : "correct"
          : "pending",
    }));
  }, [text, currentIndex, mistakes]);

  useEffect(() => {
    let typingTimer: NodeJS.Timeout;

    const handleTyping = () => {
      setIsUserTyping(true);
      clearTimeout(typingTimer);

      typingTimer = setTimeout(() => {
        setIsUserTyping(false);
      }, 500); // Will set to false after 500ms of no typing
    };

    if (userInput) {
      handleTyping();
    }

    return () => clearTimeout(typingTimer);
  }, [userInput]);

  return (
    <AnimatePresence mode="wait">
      {!raceCompleted ? (
        <motion.div
          key="typing"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full px-12 flex flex-col items-center "
        >
          <Modes
            mode={mode}
            setMode={setMode}
            modeOption={modeOption}
            setModeOption={setModeOption}
          />
          
          <motion.div
            ref={containerRef}
            className="relative text-2xl leading-relaxed tracking-wide mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Characters
              characters={characters}
              text={text}
              charRefs={charRefs}
              caretPosition={caretPosition}
              isUserTyping={isUserTyping}
            />

            <input
              ref={inputRef}
              type="text"
              autoFocus
              value={userInput}
              className="absolute inset-0 opacity-0 cursor-default"
              onChange={handleChange}
            />
          </motion.div>

          {raceStarted && (
            <motion.div
              className="mt-8 text-center text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Time: {timePassed}s | WPM:{" "}
              {calculateWPM(userInput.length, timePassed)} | Accuracy:{" "}
              {calculateAccuracy(userInput, text).toFixed(2)}%
            </motion.div>
          )}
        </motion.div>
      ) : (
        <Result
          wpm={wpm}
          accuracy={accuracy}
          time={timePassed}
          wpmData={wpmData}
          onRestart={resetTest}
          mode={mode}
          modeOption={modeOption}
        />
      )}
    </AnimatePresence>
  );
}
