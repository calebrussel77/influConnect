import { type VariantProps, cva } from 'class-variance-authority';
import React, { forwardRef } from 'react';

import { getVariantColor, type Variant } from '@/utils/variants';

import { cn } from '@/lib/utils';

const variantMessageToken = cva(['flex items-center gap-1.5'], {
  variants: {
    size: {
      sm: ['text-xs'],
      md: ['text-sm'],
      lg: ['text-lg'],
      xl: ['text-xl'],
    },
  },
  compoundVariants: [{ size: 'md' }],
  defaultVariants: {
    size: 'md',
  },
});

export type VariantMessageGlobalProps = VariantProps<
  typeof variantMessageToken
> &
  React.HTMLProps<HTMLDivElement> & { variant?: Variant };

export const VariantMessage = forwardRef<
  HTMLDivElement,
  VariantMessageGlobalProps
>(({ children, className, variant, size, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role={variant === 'error' ? 'alert' : undefined}
      style={{ color: getVariantColor(variant!) }}
      className={variantMessageToken({
        size,
        class: cn(className),
      })}
      {...props}
    >
      {children}
    </div>
  );
});

VariantMessage.displayName = 'VariantMessage';
