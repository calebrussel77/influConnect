import { VariantMessage } from '@/components/variant-message';
import { wrapChildren } from '@/utils/wrap-children';
import { Info, TriangleAlert, X } from 'lucide-react';
import React, { type PropsWithChildren } from 'react';
import { useFormContext } from 'react-hook-form';
import { Label, type LabelProps } from '../../label';
import { cn } from '@/lib/utils';

type ClassNames = {
  root?: string;
  labelRoot?: string;
  label?: string;
  highlightedHint?: string;
  hint?: string;
  error?: string;
};

export type FieldWrapperProps = {
  name?: string;
  label?: string;
  hint?: string;
  error?: string;
  highlightedHint?: string;
  className?: string;
  classNames?: ClassNames;
} & LabelProps;

const FieldWrapper = ({
  className,
  classNames,
  children,
  highlightedHint,
  error,
  name = 'field',
  label,
  hint,
  ...rest
}: PropsWithChildren<FieldWrapperProps>) => {
  const form = useFormContext();
  const state = form?.getFieldState(name, form.formState);
  const errorText = error && wrapChildren(error);

  const hasError = !!errorText || !!state?.error;
  const hasHintText = !!hint;

  const combinedErrorText = errorText ?? state?.error?.message;

  return (
    <div
      className={cn(
        'flex w-full flex-col gap-1.5',
        classNames?.root,
        className
      )}
    >
      {label && children ? (
        <div className={cn('w-full', classNames?.labelRoot)}>
          {
            <Label {...rest} className={classNames?.label} htmlFor={name}>
              {label}
            </Label>
          }
          {children}
        </div>
      ) : (
        children
      )}
      {(hasError || hasHintText) && (
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-0.5">
            {hasHintText && !hasError && (
              <VariantMessage className={cn(classNames?.hint)}>
                <Info className="h-4 w-4" />
                {hint}
              </VariantMessage>
            )}
            {hasError && (
              <VariantMessage variant="error" className={cn(classNames?.error)}>
                <TriangleAlert className="h-4 w-4" />
                {combinedErrorText as never}
              </VariantMessage>
            )}
          </div>
          {highlightedHint && (
            <div
              className={cn(
                'ml-1 text-sm text-muted-foreground',
                classNames?.highlightedHint
              )}
            >
              {highlightedHint}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { FieldWrapper };
