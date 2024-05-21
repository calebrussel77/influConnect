/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-return */
import { type Session } from 'next-auth';
import App, { type AppProps, type AppContext } from 'next/app';

import { api } from '@/utils/api';
import { getCookies } from 'cookies-next';

import '@/styles/globals.css';
import { Meta } from '@/components/meta';
import { Providers } from '@/providers';
import { GeistSans } from 'geist/font/sans';
import { getSession } from 'next-auth/react';
import { APP_URL, isMaintenanceMode } from '@/constants';
import { type NextPage } from 'next';
import { type ReactElement, type ReactNode, useMemo } from 'react';
import { MainLayout } from '@/components/layouts';
import { DefaultSeo } from 'next-seo';
import { buildCanonical } from '@/lib/next-seo-config';
import { WaitingListMode } from '@/features/waiting-list';
import { cn } from '@/lib/utils';

type CustomNextPage = NextPage & {
  getLayout?: (page: ReactElement, router: AppProps['router']) => ReactNode;
};

export type AppPageProps = {
  Component: CustomNextPage;
} & AppProps<{
  session: Session | null;
  isMaintenanceMode: boolean | undefined;
}>;

const MyApp = (props: AppPageProps) => {
  const {
    Component,
    pageProps: { isMaintenanceMode, session, ...pageProps },
    router,
  } = props;

  // Use the layout defined at the page level, if available
  const getLayout = useMemo(
    () =>
      Component.getLayout ??
      ((page: React.ReactElement) => (
        <MainLayout {...page.props}>{page}</MainLayout>
      )),
    [Component.getLayout]
  );

  const content = isMaintenanceMode ? (
    <WaitingListMode />
  ) : (
    getLayout(<Component {...pageProps} key={router.asPath} />, router)
  );

  return (
    <>
      <Meta />
      <DefaultSeo
        canonical={buildCanonical({
          path: router.asPath ?? '/',
          origin: APP_URL,
        })}
      />
      <Providers session={session} pageProps={pageProps as never}>
        <div
          className={cn(
            GeistSans.className,
            'flex h-full min-h-screen flex-col'
          )}
        >
          {content}
        </div>
      </Providers>
    </>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const initialProps = await App.getInitialProps(appContext);
  const url = appContext.ctx?.req?.url;
  const isClient = !url || url?.startsWith('/_next/data');

  const { pageProps, ...appProps } = initialProps;

  const cookies = getCookies(appContext.ctx);

  if (isMaintenanceMode) {
    return {
      pageProps: {
        ...pageProps,
        isMaintenanceMode,
      },
      ...appProps,
    };
  } else {
    const hasAuthCookie =
      !isClient && Object.keys(cookies).some(x => x.endsWith('session-token'));

    const session = hasAuthCookie ? await getSession(appContext.ctx) : null;

    // Pass this via the request so we can use it in SSR
    if (session && appContext.ctx.req) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (appContext.ctx.req as any).session = session;
    }

    return {
      pageProps: {
        ...pageProps,
        session,
      },
      ...appProps,
    };
  }
};

export default api.withTRPC(MyApp);
