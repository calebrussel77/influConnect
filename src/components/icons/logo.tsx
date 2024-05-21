import { cn } from '@/lib/utils';
import React, { type PropsWithChildren } from 'react';

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: PropsWithChildren<LogoProps>) => {
  return <p className={cn('text-lg font-bold', className)}>InfluConnect</p>;
};

export { Logo };
