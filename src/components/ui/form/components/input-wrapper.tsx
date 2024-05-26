import React, { type PropsWithChildren } from 'react';
import { FieldWrapper, type FieldWrapperProps } from './field-wrapper';
import { Input, type InputProps } from '../../input';

type InputWrapperProps = InputProps & FieldWrapperProps;

const InputWrapper = ({
  className,
  classNames,
  error,
  highlightedHint,
  hint,
  label,
  name,
  type,
  ...rest
}: PropsWithChildren<InputWrapperProps>) => {
  return (
    <FieldWrapper
      classNames={classNames}
      error={error}
      highlightedHint={highlightedHint}
      hint={hint}
      label={label}
      name={name}
      className={className}
      {...rest}
    >
      <Input
        {...rest}
        id={name}
        type={type}
        name={name}
        classNames={classNames}
      />
    </FieldWrapper>
  );
};

export { InputWrapper };
