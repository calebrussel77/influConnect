import { type VariantProps, cva } from 'class-variance-authority';
import React, { forwardRef } from 'react';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const closeButtonToken = cva(
  ['p-1 text-white focus:ring-1 focus:ring-primary'],
  {
    variants: {
      variant: {
        transparent: 'rounded-full bg-foreground/10 hover:bg-foreground/15',
        subtle: 'bg-transparent',
      },
    },
    compoundVariants: [{ variant: 'subtle' }],
    defaultVariants: {
      variant: 'subtle',
    },
  }
);

export type CloseButtonGlobalProps = VariantProps<typeof closeButtonToken> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const CloseButton = forwardRef<
  HTMLButtonElement,
  CloseButtonGlobalProps
>(({ className, variant, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={closeButtonToken({
        variant,
        class: cn(className),
      })}
      {...props}
    >
      <X className="h-3 w-3" />
    </button>
  );
});

CloseButton.displayName = 'CloseButton';
