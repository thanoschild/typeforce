import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { RefObject } from "react";

export type CharacterStatus = "correct" | "error" | "pending";

export interface Character {
  char: string;
  status: CharacterStatus;
}

interface CharactersProps {
  characters: Character[];
  text: string;
  charRefs: RefObject<(HTMLSpanElement | null)[]>;
  caretPosition: {
    top: number;
    left: number;
  };
  isUserTyping: boolean;
}

export default function Characters({
  characters,
  text,
  charRefs,
  caretPosition,
  isUserTyping,
}: CharactersProps) {
  const fontSize = 16;
  console.log("user typing", isUserTyping);

  return (
    <div className="relative">
      {characters.map((char, index) => (
        <motion.span
          key={`${char.char}-${index}-${text}`}
          ref={(el) => {
            charRefs.current[index] = el;
          }}
          className={cn(
            char.status === "correct" && "text-theme-text",
            char.status === "error" && "text-theme-error",
            char.status === "pending" && "text-theme-sub",
            "transition-opacity duration-300" // Add transition for smoother effect
          )}
          initial={{ opacity: 0.3 }} // Start dimmed
          animate={{
            opacity: 1,
            transition: {
              duration: 0.5,
              ease: "easeOut",
            },
          }}
        >
          {char.char}
        </motion.span>
      ))}

      <motion.span
        className="border-r-[3px] border-theme-caret absolute h-8"
        style={{
          top: `${caretPosition.top == 0 ? 4 : caretPosition.top}px`,
          left: `${caretPosition.left - 2}px`,
        }}
        animate={{
          opacity: [1, 0],
          transition: {
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
      />
    </div>
  );
}
