'use client';

import { AiOutlineGoogle, AiOutlineGithub } from "react-icons/ai";

interface SocialButtonProps {
  provider: 'google' | 'github';
  onClick?: () => void;
}

export default function SocialButton({ provider, onClick }: SocialButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="flex-1 bg-theme-sub-alt text-theme-text hover:bg-theme-text hover:text-theme-bg py-3 rounded-md transition-all duration-200 flex items-center justify-center"
      type="button"
    >
      {provider === 'google' && (
        <AiOutlineGoogle className="text-xl"/>
      )}
      
      {provider === 'github' && (
        <AiOutlineGithub className="text-xl"/>
      )}
    </button>
  );
}