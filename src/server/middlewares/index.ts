import { isDev } from '@/constants';
import { type Session } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { type NextRequest, NextResponse } from 'next/server';

import { routeGuardsMiddleware } from './route-guards.middleware';
import { type Middleware } from './utils';
import { env } from '@/env';

// NOTE: order matters!
const middlewares: Middleware[] = [routeGuardsMiddleware];

export const middlewareMatcher = middlewares.flatMap(
  middleware => middleware.matcher
);

export async function runMiddlewares(request: NextRequest) {
  let user: Session['user'] | null = null;
  let hasToken = true;
  const redirect = (to: string) =>
    NextResponse.redirect(new URL(to, request.url));

  for (const middleware of middlewares) {
    if (middleware.shouldRun && !middleware.shouldRun(request)) continue;
    if (middleware.useSession && !user && hasToken) {
      const token = await getToken({
        req: request,
        secret: env.NEXTAUTH_SECRET,
        secureCookie: !isDev,
      });
      if (!token) hasToken = false;
      user = token?.user as Session['user'];
    }
    const response = await middleware.handler({
      request,
      user,
      redirect,
    });
    if (response) return response;
  }

  return NextResponse.next();
}
