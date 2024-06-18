import { type Context } from '../../create-context';
import {
  throwDbError,
  throwForbiddenError,
} from '../../../utils/error-handling';
import { type CreateWaitingListSubscriptionInput } from './schema';
import blockedDomains from '@/data/email-domain-blocklist.json';
import { sendEmail } from '@/lib/email';
import InfluconnectWaitingList from '@/emails/influconnect-waiting-list';

export const createWaitingListSubscriptionHandler = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: CreateWaitingListSubscriptionInput;
}) => {
  try {
    const emailDomain = input.email.split('@')[1];

    if (blockedDomains.includes(emailDomain ?? '0v.ro')) {
      throwForbiddenError(
        `Le domaine d'email ${emailDomain} n'est pas autorisé`
      );
    }

    await sendEmail({
      component: InfluconnectWaitingList(),
      subject: 'Bienvenue à bord de InfluConnect ! 🎉',
      to: input.email,
    });

    await ctx.track.action({
      type: 'Waitinglist_Subscription',
      details: { email: input.email },
    });

    // TODO: add email to waiting list table on database
    return {
      message: `Vous êtes inscrit à notre liste d'attente. Nous vous informerons dès que notre plateforme sera disponible. Merci de votre intérêt !`,
    };
  } catch (error) {
    throw throwDbError(error);
  }
};
