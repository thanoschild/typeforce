import { Dispatch, JSX, ReactNode, SetStateAction } from "react";
import { Button } from "../core/Button";
import { Transition } from "../core/Transition";
import { Divider } from "../core/Divider";

export type ModesProps = {
    mode: string;
    setMode: Dispatch<SetStateAction<string>>;
    modeOption: number;
    setModeOption: Dispatch<SetStateAction<number>>;
  };
  

export default function Modes({mode, setMode, modeOption, setModeOption}: ModesProps) {
  return (
    <div className='flex self-start justify-self-center rounded-lg bg-sub-alt px-2 transition hover:shadow-lg'>
    <p>time</p>
    <Divider className='mx-1.5' />
    <p>word</p> 
  </div>
  )
}