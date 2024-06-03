import { useRouter } from 'next/router';

import { type LoginRedirectReason, getLoginLink } from '../utils';
import { useCurrentUser } from '@/hooks/use-current-user';

export type UseLoginRedirectProps = {
  reason: LoginRedirectReason;
  returnUrl?: string;
};

export function useLoginRedirect({ reason, returnUrl }: UseLoginRedirectProps) {
  const router = useRouter();
  const { isAuthed } = useCurrentUser();

  const requireLogin = (fn: () => void, overrides?: UseLoginRedirectProps) => {
    if (!isAuthed) {
      void router.push(
        getLoginLink({
          returnUrl: overrides?.returnUrl ?? returnUrl ?? router.asPath,
          reason: overrides?.reason ?? reason,
        })
      );
    } else {
      fn();
    }
  };

  return { requireLogin };
}
