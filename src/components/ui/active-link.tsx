import Link, { type LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { type FC, type ReactNode } from 'react';
import { format } from 'url';

import { isPathMatchRoute } from '@/utils/routing';

import { cn } from '@/lib/utils';

interface ActiveLinkProps extends NextLinkProps {
  className?: string;
  children: ReactNode;
  activeClassName: string;
}

const ActiveLink: FC<ActiveLinkProps> = ({
  children,
  href,
  activeClassName,
  className,
  ...rest
}) => {
  const { asPath } = useRouter();
  const isMatch = isPathMatchRoute(format(href), asPath);

  return (
    <Link
      href={href}
      className={cn(className, isMatch && activeClassName)}
      {...rest}
    >
      {children}
    </Link>
  );
};

export { ActiveLink };
