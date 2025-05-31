import React from 'react';
import clsx from 'clsx';

type ButtonProps = {
  variant?: 'solid' | 'ghost';
  size?: 'sm' | 'md';
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  size = 'md',
  className = '',
  onClick,
  children,
  type = 'button',
}) => {
  const baseStyles = 'w-full rounded transition flex items-center justify-center gap-1';

  const sizeStyles = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
  };

  const variantStyles = {
    solid: 'bg-neutral-700 text-neutral-200 hover:bg-neutral-800',
    ghost: 'text-neutral-400 hover:bg-neutral-800',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
    >
      {children}
    </button>
  );
};

export default Button;
