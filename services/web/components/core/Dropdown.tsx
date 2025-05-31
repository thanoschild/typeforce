import { useState } from "react";
import { ChevronDown } from "lucide-react";

type DropdownProps = {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
};

export default function Dropdown({ options, selected, onSelect }: DropdownProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (option: string) => {
    onSelect(option);
    setOpen(false);
  };

  return (
    <div className="relative w-full sm:w-auto">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs sm:text-sm px-3 py-2 rounded-md w-full"
      >
        {selected === "all"
          ? "All Modes"
          : selected.charAt(0).toUpperCase() + selected.slice(1)}
        <ChevronDown className="ml-2 w-4 h-4" />
      </button>

      {open && (
        <div className="absolute z-10 mt-1 bg-neutral-800 border border-neutral-700 rounded-md shadow-lg w-full">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className="text-neutral-400 px-4 py-2 text-sm cursor-pointer hover:bg-neutral-700"
              >
                {option === "all"
                  ? "All Modes"
                  : option.charAt(0).toUpperCase() + option.slice(1)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
