/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PrismaAdapter } from '@auth/prisma-adapter';
import { type GetServerSidePropsContext } from 'next';
import {
  type DefaultUser,
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type Session,
} from 'next-auth';
import type {
  Prisma,
  PrismaClient,
  User as PrismaUser,
  User,
} from '@prisma/client';

import { type Adapter } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';

import { env } from '@/env';
import { db } from '@/server/db';
import { getRandomInt } from '@/utils/number-helpers';
import {
  invalidateSession,
  invalidateToken,
  refreshToken,
} from './utils/session-helpers';
import { getSessionUser } from './api/modules/user/repository';
import { randomUUID } from 'crypto';

type ExtendedUser = object & AsyncReturnType<typeof getSessionUser>;

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface User extends ExtendedUser, Omit<DefaultUser, 'id'> {
    id: PrismaUser['id'];
  }

  //@ts-expect-error
  interface SessionUser extends ExtendedUser, DefaultSession.user {}

  interface Session {
    user?: ExtendedUser & DefaultSession['user'];
    error?: string;
  }
}

const setUserName = async (id: string, setTo: string) => {
  try {
    setTo = setTo.split('@')[0]?.replace(/[^A-Za-z0-9_]/g, '') ?? '';
    const { username } = await db.user.update({
      where: { id },
      data: {
        username: `${setTo}${getRandomInt(100, 999)}`,
      },
      select: {
        username: true,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return username ?? undefined;
  } catch (e) {
    return undefined;
  }
};

function CustomPrismaAdapter(prismaClient: PrismaClient) {
  const adapter = PrismaAdapter(prismaClient);
  adapter.useVerificationToken = async identifier_token => {
    try {
      // We are going to stop deleting this token to handle email services that scan for malicious links
      // const verificationToken = await prismaClient.verificationToken.delete({
      //   where: { identifier_token },
      // });
      return await prismaClient.verificationToken.findUniqueOrThrow({
        where: { identifier_token },
      });
    } catch (error) {
      // If token already used/deleted, just return null
      // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
      if ((error as Prisma.PrismaClientKnownRequestError).code === 'P2025')
        return null;
      throw error;
    }
  };

  return adapter;
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  events: {
    createUser: async ({ user }) => {
      if (user.username) return; // Somehow this was being run for existing users, so we need to check for username...

      const startingUsername =
        user.name?.trim() ?? user.email?.trim() ?? `influconnect_`;

      if (startingUsername) {
        let username: string | undefined = undefined;
        while (!username)
          username = await setUserName(user.id, startingUsername);
      }
    },
    signOut: async ({ token }) => {
      await invalidateToken(token);
    },
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (trigger === 'update') {
        await invalidateSession(String(token.sub));
        token.user = await getSessionUser({ userId: String(token.sub) });
      } else {
        if (user) token.user = user;
        const { deletedAt, ...restUser } = token.user as User;
        token.user = { ...restUser };
      }
      if (!token.id) token.id = randomUUID();

      return token;
    },
    async session({ session, token }) {
      const newToken = await refreshToken(token);

      if (!newToken) return {} as Session;

      session.user = (
        newToken.user ? newToken.user : session.user
      ) as Session['user'];

      return session;
    },
  },
  adapter: CustomPrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      allowDangerousEmailAccountLinking: true,
      httpOptions: {
        timeout: 20_000,
      },
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),

    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  debug: false,
  secret: env.NEXTAUTH_SECRET,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
