import { db } from '@/server/db';

import { type CreateWaitingListSubscriptionInput } from './schema';

export const createWaitingListSubscription = ({
  email,
  name,
}: CreateWaitingListSubscriptionInput) => {
  return db.waitingListSubscription.create({ data: { email, name } });
};

export const deleteWaitingListSubscription = ({
  email,
}: CreateWaitingListSubscriptionInput) => {
  return db.waitingListSubscription.delete({ where: { email } });
};

export const getWaitingListSubscriptions = ({ email }: { email?: string }) => {
  return db.waitingListSubscription.findMany({
    where: email ? { email } : undefined,
    select: { email: true },
  });
};

export const getWaitingListSubscription = ({ email }: { email: string }) => {
  return db.waitingListSubscription.findUnique({ where: { email } });
};
