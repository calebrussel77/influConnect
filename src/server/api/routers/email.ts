import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

import { Resend } from 'resend';
import { env } from '@/env';
import * as emailTemplates from '@/emails';

const resend = new Resend(env.RESEND_API_KEY);

export const emailRouter = createTRPCRouter({
  send: publicProcedure.mutation(async () => {
    try {
      await resend.emails.send({
        from: env.EMAIL_FROM,
        to: 'lerussecaleb@gmail.com',
        subject: 'InfluConnect - Updates for you',
        react: emailTemplates.GooglePlayPolicyUpdateEmail(),
      });

      return {
        message: `Email send successfully`,
      };
    } catch (e) {
      console.log(e);
      throw new Error(e as never);
    }
  }),
});
