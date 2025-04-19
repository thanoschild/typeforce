import { type ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

type GridProps = ComponentPropsWithoutRef<'div'>;

export function Grid({ className, ...props }: GridProps) {
  return (
    <div className={twMerge('grid grid-cols-2 gap-2', className)} {...props} />
  );
}
