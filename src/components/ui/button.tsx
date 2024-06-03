import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import Link, { LinkProps } from 'next/link';
import { Spinner } from './spinner';

const buttonVariants = cva(
  'inline-flex items-center gap-3 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        xs: 'h-8 rounded-md px-2',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isFullWidth?: boolean;
  isLoading?: boolean;
  href?: LinkProps['href'];
  asLink?: LinkProps['as'];
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      isFullWidth,
      size,
      asChild = false,
      disabled,
      isLoading,
      href,
      children,
      asLink,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isDisabled = disabled ?? isLoading;
    const isGhostOrOutlineVariant =
      variant === 'ghost' || variant === 'outline';

    const btn = (
      <Comp
        className={cn(
          isFullWidth ? 'w-full' : 'w-auto',
          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        <React.Fragment>
          {isLoading && (
            <Spinner
              className={cn(size === 'lg' ? 'h-7 w-7' : 'h-6 w-6')}
              variant={!isGhostOrOutlineVariant ? 'ghost' : 'white'}
            />
          )}
          {children}
        </React.Fragment>
      </Comp>
    );

    if (href) {
      return (
        <Link href={href} as={asLink} className={className}>
          {btn}
        </Link>
      );
    }

    return btn;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
