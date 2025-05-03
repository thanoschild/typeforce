"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectDropdownProps<T> {
  value: T;
  onChange: (value: T) => void;
  options: readonly T[];
  placeholder?: string;
}

export function SelectDropdown<T extends string | number>({ 
  value, 
  onChange, 
  options,
  placeholder 
}: SelectDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md bg-theme-sub-alt px-4 p-2 text-left "
      >
        <span className={!value ? "text-theme-sub" : ""}>
          {value || placeholder}
        </span>
        <ChevronDown 
          className={cn(
            "h-5 w-5 transition-transform duration-200", 
            isOpen ? "rotate-180" : ""
          )} 
        />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full origin-top-right text-sm rounded-md bg-theme-sub-alt">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                className={cn(
                  "block w-full px-4 py-2 text-left text-theme-text hover:text-theme-bg hover:bg-theme-text rounded-md",
                  value === option && ""
                )}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}