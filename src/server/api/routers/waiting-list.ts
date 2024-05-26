import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { createWaitingListSubscriptionSchema } from '../modules/waiting-list/waiting-list.schema';
import { createWaitingListSubscriptionHandler } from '../modules/waiting-list/waiting-list.controller';

export const waitingListRouter = createTRPCRouter({
  subscribe: publicProcedure
    .input(createWaitingListSubscriptionSchema)
    .mutation(createWaitingListSubscriptionHandler),
});
