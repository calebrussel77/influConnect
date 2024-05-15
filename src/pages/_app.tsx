import { type Session } from 'next-auth';
import { type AppType } from 'next/app';

import { api } from '@/utils/api';

import '@/styles/globals.css';
import { Meta } from '@/components/meta';
import { Providers } from '@/providers';
import { Toaster } from '@/components/ui/sonner';
import { GeistSans } from 'geist/font/sans';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Meta />
      <Providers session={session} pageProps={pageProps as never}>
        <main className={GeistSans.className}>
          <Component {...pageProps} />
          <Toaster position="bottom-right" duration={900000} />
        </main>
      </Providers>
    </>
  );
};

export default api.withTRPC(MyApp);
