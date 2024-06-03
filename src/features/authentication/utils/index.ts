import { QS } from '@/lib/qs';

export const loginRedirectReasons = {
  'switch-accounts': 'Log into the account you wish to add',
};

export type LoginRedirectReason = keyof typeof loginRedirectReasons;

export type LoginLinkOptions = {
  returnUrl?: string;
  reason?: LoginRedirectReason;
};

export function getLoginLink({ returnUrl, reason }: LoginLinkOptions) {
  return `/login?${QS.stringify({ returnUrl, reason })}`;
  // return `/login?returnUrl=${encodeURIComponent(returnUrl)}`;
}
