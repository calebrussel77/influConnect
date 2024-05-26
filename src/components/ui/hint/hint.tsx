import { type VariantProps, cva } from 'class-variance-authority';
import React, { type ReactNode, forwardRef } from 'react';

import { cn } from '@/lib/utils';

const hintToken = cva(['whitespace-normal tracking-wide text-slate-400'], {
  variants: {
    size: {
      sm: ['text-xs'],
      md: ['text-xs'],
      lg: ['text-sm'],
      xl: ['text-md'],
    },
  },
  compoundVariants: [{ size: 'md' }],
  defaultVariants: {
    size: 'md',
  },
});

export type HintGlobalProps = VariantProps<typeof hintToken> & {
  className?: string;
  children: ReactNode;
};

export const Hint = forwardRef<HTMLDivElement, HintGlobalProps>(
  ({ children, className, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          hintToken({
            size,
          }),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Hint.displayName = 'Hint';
