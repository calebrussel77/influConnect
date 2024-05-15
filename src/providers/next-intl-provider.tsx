import { useRouter } from 'next/router';
import { NextIntlClientProvider } from 'next-intl';
import { type PropsWithChildren } from 'react';
import { type PageProps } from '@/types';

export function NextIntlProvider({
  children,
  pageProps,
}: PropsWithChildren<{ pageProps: PageProps }>) {
  const router = useRouter();
  return (
    <NextIntlClientProvider
      // To achieve consistent date, time and number formatting
      // across the app, you can define a set of global formats.
      formats={{
        dateTime: {
          short: {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          },
        },
      }}
      locale={router.locale}
      messages={pageProps.messages}
      // Providing an explicit value for `now` ensures consistent formatting of
      // relative values regardless of the server or client environment.
      now={new Date(pageProps.now)}
      // Also an explicit time zone is helpful to ensure dates render the
      // same way on the client as on the server, which might be located
      // in a different time zone.
      timeZone="Europe/Vienna"
    >
      {children}
    </NextIntlClientProvider>
  );
}
