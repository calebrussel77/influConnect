/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createServerSideHelpers } from '@trpc/react-query/server';
import {
  type GetServerSidePropsContext,
  type GetServerSidePropsResult,
  type Redirect,
} from 'next';
import { type Session } from 'next-auth';
import superjson from 'superjson';

import { appRouter } from '../api/root';
import { getServerAuthSession } from '../auth';
import { Tracker } from './tracker';

export const getServerProxySSGHelpers = (
  ctx: GetServerSidePropsContext,
  session: Session | null
) => {
  const router = appRouter;
  const transformer = superjson;

  const ssg = createServerSideHelpers({
    router,
    ctx: {
      track: new Tracker(),
      user: session?.user,
      ip: null as never,
      res: null as never,
      req: null as never,
      cache: null as never,
    },
    transformer,
  });

  return ssg;
};

export const createServerSideProps = <P>({
  resolver,
  shouldUseSSG,
  shouldUseSession = false,
  prefetch = 'once',
}: CreateServerSidePropsProps<P>) => {
  return async (context: GetServerSidePropsContext) => {
    try {
      const isClient = context.req.url?.startsWith('/_next/data') ?? false;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const session: Session | null =
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (context.req as any).session ??
        (shouldUseSession ? await getServerAuthSession(context) : null);

      const ssg =
        shouldUseSSG && (prefetch === 'always' || !isClient)
          ? getServerProxySSGHelpers(context, session)
          : undefined;

      const result = (await resolver({
        ctx: context,
        isClient,
        ssg,
        session,
      })) as GetPropsFnResult<P> | undefined;

      let props: GetPropsFnResult<P>['props'] | undefined;

      if (result) {
        if (result.redirect) return { redirect: result.redirect };
        if (result.notFound) return { notFound: result.notFound };

        props = result.props;
      }

      return {
        props: {
          session,
          messages: (await import(`../../../messages/${context.locale}.json`))
            .default as never,
          ...((props as unknown as P) ?? ({} as unknown as P)),
          ...(ssg ? { trpcState: ssg.dehydrate() } : {}),
        },
      };
    } catch (error) {
      // good place to handle global errors
      // sentryCaptureException(error);
      return { notFound: true };
    }
  };
};

type GetPropsFnResult<P> = {
  props: P;
  redirect: Redirect;
  notFound: true;
};

type CreateServerSidePropsProps<P> = {
  shouldUseSSG?: boolean;
  shouldUseSession?: boolean;
  prefetch?: 'always' | 'once';
  resolver: (
    context: CustomGetServerSidePropsContext
  ) =>
    | Promise<GetServerSidePropsResult<P> | void>
    | GetServerSidePropsResult<P>
    | void;
};

type CustomGetServerSidePropsContext = {
  ctx: GetServerSidePropsContext;
  isClient: boolean;
  ssg?: ReturnType<typeof getServerProxySSGHelpers>;
  session?: Session | null;
};
