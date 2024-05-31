import * as React from 'react';

import { type Variant, getVariantColor } from '@/utils/variants';

import { cn } from '@/lib/utils';

import { useMergeRefs } from '@/hooks/use-merge-refs';

import { CloseButton } from './close-button';

type ClassNames = {
  root: string;
  input: string;
  leftSection: string;
  rightSection: string;
};

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  loading?: boolean;
  variant?: Variant;
  autoFocus?: boolean;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  rightSectionPointerEvents?: 'auto' | 'none';
  leftSectionPointerEvents?: 'auto' | 'none';
  isFullWidth?: boolean;
  isClearable?: boolean;
  classNames?: Partial<ClassNames>;
  onClear?: () => void;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      variant,
      leftSection,
      rightSection,
      disabled,
      loading,
      classNames,
      leftSectionPointerEvents = 'none',
      rightSectionPointerEvents = 'none',
      isFullWidth = true,
      isClearable = true,
      onClear,
      ...props
    },
    ref
  ) => {
    const hasRightElement = rightSection ?? isClearable;
    const hasError = variant === 'error';
    const inputRef = React.useRef<HTMLInputElement>(null);
    const mergedRef = useMergeRefs(ref, inputRef) as unknown;

    const closeButton = props.value && type !== 'hidden' && (
      <CloseButton
        size="sm"
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/unbound-method
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            'value'
          )?.set;
          nativeInputValueSetter?.call(inputRef.current, '');

          const ev2 = new Event('input', { bubbles: true });
          inputRef.current?.dispatchEvent(ev2);
          onClear?.();
        }}
      />
    );

    return (
      <div
        className={cn(
          'relative',
          isFullWidth ? 'w-full flex-1' : 'w-fit',
          classNames?.root
        )}
      >
        {leftSection && (
          <div
            data-position="left"
            className={cn(
              'absolute inset-y-0 left-0 flex items-center pl-3 pr-1',
              leftSectionPointerEvents === 'none' && 'pointer-events-none',
              classNames?.leftSection
            )}
          >
            {leftSection}
          </div>
        )}
        <input
          style={variant ? { borderColor: getVariantColor(variant) } : {}}
          aria-invalid={hasError ? 'true' : 'false'}
          type={type}
          disabled={disabled ?? loading}
          className={cn(
            'flex h-10 w-full rounded-sm border border-input bg-white px-3 py-3 text-sm text-slate-900 shadow-sm ring-offset-background transition duration-300 selection:bg-slate-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-200',
            leftSection && 'pl-10',
            hasRightElement && 'pr-10',
            classNames?.input,
            className
          )}
          ref={mergedRef as React.RefObject<HTMLInputElement>}
          {...props}
        />

        {hasRightElement && (
          <div
            data-position="right"
            className={cn(
              'absolute inset-y-0 right-0 flex items-center gap-3 pl-1',
              isClearable && !rightSection ? 'pr-1.5' : 'pr-3'
            )}
          >
            {isClearable && closeButton}
            {rightSection && (
              <div
                className={cn(
                  rightSectionPointerEvents === 'none' && 'pointer-events-none',
                  classNames?.rightSection
                )}
              >
                {rightSection}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
