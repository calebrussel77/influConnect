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
import { type ReactElement, type ReactNode, useMemo, useEffect } from 'react';
import { MainLayout } from '@/components/layouts';
import { buildCanonical } from '@/lib/next-seo-config';
import { WaitingListMode } from '@/features/waiting-list';
import { cn } from '@/lib/utils';
import { env } from '@/env';
import { isDev } from '@/constants';
import { isWindowDefined } from '@/utils/type-guards';
import posthog from 'posthog-js';
import { DefaultSeo } from '@/components/ui/default-seo';
import { FB_PIXEL_ID, fbp } from '@/lib/fb-pixel';
import Script from 'next/script';

type CustomNextPage = NextPage & {
  getLayout?: (page: ReactElement, router: AppProps['router']) => ReactNode;
};

export type AppPageProps = {
  Component: CustomNextPage;
} & AppProps<{
  session: Session | null;
  isMaintenanceMode: boolean | undefined;
}>;

if (isWindowDefined()) {
  if (!isDev) {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
      loaded: posthog => {
        if (isDev) posthog.debug(); // debug mode in development
      },
    });
  }
}

const MyApp = (props: AppPageProps) => {
  const {
    Component,
    pageProps: { isMaintenanceMode, session, ...pageProps },
    router,
  } = props;

  useEffect(() => {
    // This pageview only triggers the first time (it's important for Pixel to have real information)
    fbp.pageview();

    const handleRouteChange = () => {
      fbp.pageview();
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

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
      {/* Global Site Code Pixel - Facebook Pixel */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${FB_PIXEL_ID});
          `,
        }}
      />
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
