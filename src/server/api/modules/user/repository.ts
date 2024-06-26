import { db } from '@/server/db';
import { type Prisma } from '@prisma/client';

export const getSessionUser = async ({ userId }: { userId?: string }) => {
  if (!userId) return undefined;
  const where: Prisma.UserWhereInput = { deletedAt: null };
  if (userId) where.id = userId;

  const response = await db.user.findFirst({
    where,
  });

  if (!response) return undefined;

  // nb: doing this because these fields are technically nullable, but prisma
  // likes returning them as undefined. that messes with the typing.
  const user = {
    ...response,
    image: response.image ?? undefined,
    name: response.name ?? undefined,
    username: response.username ?? undefined,
    email: response.email ?? undefined,
    emailVerified: response.emailVerified ?? undefined,
    isModerator: response.isModerator ?? undefined,
    deletedAt: response.deletedAt ?? undefined,
    createdAt: response.createdAt ?? undefined,
  };

  return user;
};
