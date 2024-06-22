/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import { TRPCError, initTRPC } from '@trpc/server';
import superjson from 'superjson';

import { type Context } from './create-context';
import { type NextApiRequest } from 'next';
import { REDIS_KEYS, redis } from '@/lib/redis';
import semVer from 'semver';

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

async function needsUpdate(req?: NextApiRequest) {
  const type = req?.headers['x-client'] as string;
  const version = req?.headers['x-client-version'] as string;
  const date = req?.headers['x-client-date'] as string;

  if (type !== 'web') return false;

  const client = await redis.hgetall<{
    version?: string;
    date?: string;
  }>(REDIS_KEYS.CLIENT);

  if (!client) return true;

  if (client.version) {
    if (!version || version === 'unknown') return true;
    return semVer.lt(version, client.version);
  }
  if (client.date) {
    if (!date) return true;
    return new Date(Number(date)) < new Date(client.date);
  }

  return false;
}

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Enforce client version
 */
export const enforceClientVersion = t.middleware(async ({ next, ctx }) => {
  if (await needsUpdate(ctx.req)) {
    console.log('enforceClientVersion is set to TRUE');
    ctx.res?.setHeader('X-Update-Required', 'true');
    ctx.cache.edgeTTL = 0;
  }
  return next({ ctx });
});

/**
 * Protected middleware
 **/
const isAuthed = t.middleware(({ ctx: { user }, next }) => {
  if (!user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: { user },
  });
});

export const { router, middleware } = t;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure.use(enforceClientVersion);

/**
 * Protected Procedure used when the user is connected
 * but `does'nt have a profile selected`
 **/
export const protectedProcedure = publicProcedure.use(isAuthed);

/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;
