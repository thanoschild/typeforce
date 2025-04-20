import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TextProps extends ComponentPropsWithoutRef<'div'> {
  dimmed?: boolean;
}

export const Text = forwardRef<HTMLDivElement, TextProps>(function Text(
  {className, dimmed = false, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={twMerge('text-left transition', dimmed ? 'text-theme-sub' : 'text-theme-text', className)}
      {...props}
    />
  );
});
