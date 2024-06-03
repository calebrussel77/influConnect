import { useRouter } from 'next/router';
import React, { type MouseEvent, type MouseEventHandler } from 'react';

import { type UseLoginRedirectProps } from '../hooks/use-login-redirect';
import { getLoginLink } from '../utils';
import { useCurrentUser } from '@/hooks/use-current-user';

export type Props = UseLoginRedirectProps & {
  children: React.ReactElement<{ onClick?: MouseEventHandler<HTMLElement> }>;
  onRedirect?: () => void;
};

export function LoginRedirect({
  children,
  reason,
  returnUrl,
  onRedirect,
}: Props) {
  const router = useRouter();
  const { isAuthed } = useCurrentUser();

  return !isAuthed
    ? React.cloneElement(children, {
        ...children.props,
        onClick: (e: MouseEvent<HTMLElement>) => {
          e.preventDefault();
          void router.push(
            getLoginLink({ returnUrl: returnUrl ?? router.asPath, reason })
          );
          onRedirect && onRedirect();
        },
      })
    : children;
}
