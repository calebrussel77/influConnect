// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import en from './messages/en.json';
import { type ReactElement, type ReactNode } from 'react';
import { type NextPage } from 'next';

type Messages = typeof en;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}

  type DeepPartial<T> = T extends object
    ? {
        [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;

  type DeepNonNullable<T> = {
    [P in keyof T]-?: NonNullable<T[P]>;
  } & NonNullable<T>;

  type Prettify<T> = {
    [K in keyof T]: T[K];
  } & unknown;

  type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<
    P,
    IP
  > & {
    getLayout?: (page: ReactElement) => ReactNode;
  };

  type ComponentWithProps<T> =
    T extends React.ComponentType<infer P> ? P : object;
}
