/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type User } from '@prisma/client';
import { type JWT } from 'next-auth/jwt';

import { createLogger } from './logging';
import { redis } from '@/lib/redis';
import { getSessionUser } from '../api/modules/user/repository';
import { randomUUID } from 'crypto';

const DEFAULT_EXPIRATION = 60 * 60 * 24 * 30; // 30 days
const log = createLogger('session-helpers', 'green');

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var sessionsToInvalidate: Record<number, Date>;
  // eslint-disable-next-line no-var, vars-on-top
  var sessionsFetch: Promise<Record<number, Date>> | null;
}

const TOKEN_ID_ENFORCEMENT = 1713139200000;

export async function invalidateToken(token: JWT) {
  if (!token?.id || typeof token.id !== 'string') return;

  await redis.hset('session:invalid-tokens', {
    [token.id]: new Date().toISOString(),
  });
  log(`Invalidated token ${token.id}`);
}

export async function refreshToken(token: JWT) {
  if (!token.user) return token;
  const user = token.user as User;
  if (!user.id) return token;

  let shouldRefresh = false;

  // Enforce Token Validity
  if (!token.id) {
    if (Date.now() > TOKEN_ID_ENFORCEMENT) return null;
    shouldRefresh = true;
  } else {
    const tokenInvalid = await redis.hexists(
      'session:invalid-tokens',
      token.id as string
    );
    if (tokenInvalid) return null;
  }

  // Enforce Token Refresh
  if (!shouldRefresh) {
    const userDateStr = await redis.get(`session:${user.id}`);
    const userDate = userDateStr ? new Date(userDateStr as never) : undefined;
    const allInvalidationDateStr = await redis.get('session:all');
    const allInvalidationDate = allInvalidationDateStr
      ? new Date(allInvalidationDateStr as never)
      : undefined;
    const invalidationDate =
      userDate && allInvalidationDate
        ? new Date(Math.max(userDate.getTime(), allInvalidationDate.getTime()))
        : userDate ?? allInvalidationDate;
    shouldRefresh =
      !invalidationDate ||
      !token.signedAt ||
      new Date(token.signedAt as number) < invalidationDate;
  }

  if (!shouldRefresh) return token;

  if (user.id) {
    const refreshedUser = await getSessionUser({ userId: user.id });

    console.log('REFRESHEDUSER AND USER AND TOKEN', {
      refreshedUser,
    });

    setToken(token, refreshedUser);
    log(`Refreshed session for user ${user.id}`);
  }
  return token;
}

function setToken(token: JWT, session: AsyncReturnType<typeof getSessionUser>) {
  if (!session || session.deletedAt) {
    token.user = undefined;
    return;
  }

  // Prepare token
  token.user = session;
  const _user = token.user as never;
  for (const key of Object.keys(_user)) {
    //@ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    if (_user[key] instanceof Date) _user[key] = _user[key].toISOString();
    else if (typeof _user[key] === 'undefined') delete _user[key];
  }

  token.id = token.id ?? randomUUID();
  token.signedAt = Date.now();
}

export async function invalidateSession(userId: string) {
  await redis.set(`session:${userId}`, new Date().toISOString(), {
    ex: DEFAULT_EXPIRATION, // 30 days
  });
  log(`Scheduling refresh session for user ${userId}`);
}

export async function invalidateAllSessions(
  asOf: Date | undefined = new Date()
) {
  await redis.set('session:all', asOf.toISOString(), {
    ex: DEFAULT_EXPIRATION, // 30 days
  });
  log(`Scheduling session refresh for all users`);
}
