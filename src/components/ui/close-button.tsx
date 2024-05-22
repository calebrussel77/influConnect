import React, { forwardRef } from 'react';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const sizeMap = {
  sm: { btn: 'h-5 w-5', icon: 'h-3 w-3' },
  md: { btn: 'h-6 w-6', icon: 'h-4 w-4' },
};

export type CloseButtonGlobalProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: keyof typeof sizeMap;
  };

export const CloseButton = forwardRef<
  HTMLButtonElement,
  CloseButtonGlobalProps
>(({ className, size = 'md', ...props }, ref) => {
  const sizeClassNames = sizeMap[size];

  return (
    <button
      ref={ref}
      className={cn(
        'flex items-center justify-center rounded-full border bg-accent bg-slate-200 p-2 text-muted-foreground opacity-70 ring-offset-background transition-opacity hover:opacity-100 disabled:pointer-events-none',
        sizeClassNames?.btn,
        className
      )}
      {...props}
    >
      <X className={cn('flex-shrink-0', sizeClassNames?.icon)} />
    </button>
  );
});

CloseButton.displayName = 'CloseButton';
