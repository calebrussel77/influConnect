import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React, { type PropsWithChildren } from 'react';
import { ThemeProvider } from './theme-provider';

type ProvidersProps = {
  session: Session | null;
};

const Providers = ({
  session,
  children,
}: PropsWithChildren<ProvidersProps>) => {
  return (
    <SessionProvider
      session={session}
      refetchOnWindowFocus={false}
      refetchWhenOffline={false}
      refetchInterval={5 * 60}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};

export { Providers };
