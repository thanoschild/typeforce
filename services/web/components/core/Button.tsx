import { Slot } from '@radix-ui/react-slot';
import { type ComponentPropsWithoutRef } from 'react';
import { RiLoaderLine } from 'react-icons/ri';
import { twMerge } from 'tailwind-merge';

export type ButtonVariant = 'danger' | 'filled' | 'subtle' | 'text';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  active?: boolean;
  asChild?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
}

const getVariantClasses = (variant: ButtonVariant = 'filled') => {
  const baseClasses = [
    'flex items-center justify-center gap-1.5',
    'rounded-lg px-3 py-2 text-center leading-tight',
    'transform transition-transform duration-100 ease-in-out',
    'active:scale-95 active:transform'
  ].join(' ');
  
  const variants = {
    danger: [
      'bg-theme-sub-alt',
      'text-theme-text',
      'transition-colors duration-50',
      'hover:bg-theme-error hover:text-theme-bg',
      'focus-visible:bg-theme-error focus-visible:text-theme-bg',
    ].join(' '),
    
    filled: [
      'bg-theme-sub-alt',
      'text-theme-text',
      'transition-colors duration-50',
      'hover:bg-theme-main hover:text-theme-bg',
      'focus-visible:bg-theme-main focus-visible:text-theme-bg focus-visible:outline-none',
      'data-[active=true]:bg-theme-main data-[active=true]:text-theme-bg'
    ].join(' '),
    
    subtle: [
      'bg-transparent',
      'text-theme-sub',
      'transition-colors duration-50',
      'hover:text-theme-text',
      'focus-visible:bg-theme-main focus-visible:text-theme-bg focus-visible:outline-none',
    ].join(' '),
    
    text: [
      'bg-transparent',
      'text-theme-sub',
      'transition-colors duration-50',
      'hover:text-theme-text',
      'focus-visible:text-theme-main focus-visible:outline-none',
      'data-[active=true]:text-theme-main'
    ].join(' ')
  };

  return twMerge(baseClasses, variants[variant]);
};

export function Button({
  active = false,
  asChild = false,
  children,
  className,
  disabled,
  loading = false,
  type = 'button',
  variant = 'filled',
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : 'button';
  return (
    <Component
      data-active={active}
      className={twMerge(
        getVariantClasses(variant),
        disabled && 'pointer-events-none opacity-50',
        className
      )}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {loading ? (
        <RiLoaderLine className="m-0.5 animate-spin" />
      ) : (
        children
      )}
    </Component>
  );
}
