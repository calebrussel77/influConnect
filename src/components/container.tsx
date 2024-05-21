import { cn } from '@/lib/utils';
import { type HtmlProps } from '@react-email/components';
import React, { type PropsWithChildren } from 'react';

interface ContainerProps extends HtmlProps {
  as?: React.ElementType;
}

const Container = ({
  className,
  children,
  as: Component = 'div',
  ...rest
}: PropsWithChildren<ContainerProps>) => {
  return (
    <Component
      className={cn(
        'mx-auto w-full max-w-screen-xl px-8 2xl:max-w-screen-2xl',
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};

export { Container };
