'use client';

import { type HTMLMotionProps, type Variants, m } from 'framer-motion';
import { forwardRef } from 'react';

const DEFAULT_VARIANTS: Variants = {
  hidden: { opacity: 0, pointerEvents: 'none' },
  visible: { opacity: 1, pointerEvents: 'auto' },
};

export const Transition = forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>(function Transition(
  {
    variants = DEFAULT_VARIANTS,
    initial = 'hidden',
    animate = 'visible',
    exit = 'hidden',
    ...props
  },
  ref,
) {
  return (
    <m.div
      ref={ref}
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={{ duration: 0.15 }}
      {...props}
    />
  );
});

