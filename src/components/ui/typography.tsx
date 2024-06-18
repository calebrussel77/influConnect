import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { ActionTooltip } from '@/components/action-tooltip';

import { cn } from '@/lib/utils';

import { Truncate, type TruncateProps } from './truncate';

const VARIANTS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

export const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-4xl md:text-5xl font-bold leading-[3.5rem] md:leading-[3.5rem] tracking-tight',
      h2: 'text-3xl md:text-4xl font-bold leading-[3rem] md:leading-[3rem]',
      h3: 'text-xl font-semibold leading-6 tracking-tight',
      h4: 'text-lg font-semibold',
      h5: 'text-lg font-semibold leading-snug',
      subtle:
        'text-lg leading-7 text-slate-500 dark:text-slate-400 font-normal',
      paragraph: 'text-base',
      description:
        'text-base leading-7 text-slate-500 dark:text-slate-400 font-normal',
      small: 'text-sm text-muted-foreground leading-5 font-normal',
    },
  },
  defaultVariants: {
    variant: 'paragraph',
  },
});

type TruncatedTypography = TruncateProps & {
  truncate?: true;
  isTooltipDisabled?: boolean;
};

type ExpandedTypography = {
  truncate?: false;
};

type SizeVariant = TruncatedTypography | ExpandedTypography;

export type TypographyProps<
  T extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
> = {
  as?: T;
  className?: string;
  title?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<T> | undefined;
} & VariantProps<typeof typographyVariants> &
  ComponentWithProps<T>;

const Typography = React.forwardRef<
  HTMLElement,
  SizeVariant & TypographyProps<any>
>(
  (
    {
      className,
      onClick,
      variant,
      truncate = false,
      children,
      as: As = 'p',
      ...rest
    },
    ref
  ) => {
    const [hasTooltip, setHasTooltip] = React.useState(false);

    const Component = As as
      | keyof JSX.IntrinsicElements
      | React.ComponentType<any>;

    const hasAssociatedVariant = VARIANTS.includes(
      As as (typeof VARIANTS)[number]
    );

    const newVariant = hasAssociatedVariant
      ? (As as typeof variant)
      : 'paragraph';

    const renderChildren = () => {
      if (truncate) {
        const truncateProps = rest as TruncatedTypography;
        const {
          hasEllipsisText,
          renderEllipsis,
          shouldDefaultTruncate,
          lines,
          onTruncate,
          tokenize,
          isTooltipDisabled = true,
          ...otherProps
        } = truncateProps;

        const onTruncateHandler = (wasTruncated: boolean) => {
          setHasTooltip(wasTruncated);
          onTruncate?.(wasTruncated);
        };

        const truncatedContent = (
          <Truncate
            {...{
              className: cn(
                typographyVariants({
                  variant: variant ?? newVariant,
                  className,
                })
              ),
              hasEllipsisText,
              renderEllipsis,
              shouldDefaultTruncate,
              lines,
              onTruncate: onTruncateHandler,
              tokenize,
              onClick,
            }}
          >
            {children}
          </Truncate>
        );

        return !isTooltipDisabled && hasTooltip ? (
          <ActionTooltip label={children}>
            <Component ref={ref} className="cursor-default" {...otherProps}>
              {truncatedContent}
            </Component>
          </ActionTooltip>
        ) : (
          <Component ref={ref} {...otherProps}>
            {truncatedContent}
          </Component>
        );
      }
      return (
        <Component
          ref={ref}
          className={cn(
            typographyVariants({
              variant: variant ?? newVariant,
              className,
            })
          )}
          {...rest}
        >
          {children}
        </Component>
      );
    };

    return renderChildren();
  }
);

Typography.displayName = 'Typography';

export { Typography };
