import { type ComponentPropsWithoutRef, type ElementRef, type ReactNode, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { Grid } from './Grid';
import { Text } from './Text';

export interface DividerProps extends ComponentPropsWithoutRef<'div'> {
  label?: ReactNode;
  orientation?: 'horizontal' | 'vertical';
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  { className, label, orientation = 'vertical', ...props },
  ref,
) {
  return label ? (
    <div className='grid gap-2 grid-cols-[1fr_auto_1fr]' {...props}>
      <div className={twMerge('h-0.5 self-center rounded bg-sub transition', className)} />
      {typeof label === 'string' ? (
        <Text className='text-xs' dimmed>
          <span>{label}</span>
        </Text>
      ) : (
        label
      )}
      <div className={twMerge('h-0.5 self-center rounded bg-sub transition', className)} />
    </div>
  ) : (
    <div
      className={twMerge(
        'self-stretch rounded bg-bg transition',
        orientation === 'vertical' ? 'my-2 w-1' : 'mx-2 h-1',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
