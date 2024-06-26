import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React, { type PropsWithChildren } from 'react';
import { ThemeProvider } from './theme-provider';
import { NextIntlProvider } from './next-intl-provider';
import { type PageProps } from '@/types';
import { Toaster } from '@/components/ui/sonner';
import { ModalsManagerProvider } from './modals-manager-provider';
import { PosthogProvider } from './posthog-provider';
import { UpdateRequiredWatcher } from '@/components/update-required-watcher';

type ProvidersProps = {
  session: Session | null;
  pageProps: PageProps;
};

const Providers = ({
  session,
  children,
  pageProps,
}: PropsWithChildren<ProvidersProps>) => {
  return (
    <SessionProvider
      session={session}
      refetchOnWindowFocus={false}
      refetchWhenOffline={false}
      refetchInterval={5 * 60}
    >
      <NextIntlProvider pageProps={pageProps}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PosthogProvider>
            <ModalsManagerProvider>{children}</ModalsManagerProvider>
            <UpdateRequiredWatcher />
            <Toaster position="bottom-right" />
          </PosthogProvider>
        </ThemeProvider>
      </NextIntlProvider>
    </SessionProvider>
  );
};

export { Providers };
