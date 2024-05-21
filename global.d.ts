/* eslint-disable @typescript-eslint/no-empty-interface */
import en from './messages/en.json';
import { type ReactElement, type ReactNode } from 'react';
import { type NextPage } from 'next';

type Messages = typeof en;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}

  type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<
    P,
    IP
  > & {
    getLayout?: (page: ReactElement) => ReactNode;
  };

  type ComponentWithProps<T> =
    T extends React.ComponentType<infer P> ? P : object;
}
