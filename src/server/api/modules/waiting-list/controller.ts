import { type Context } from '../../create-context';
import {
  throwDbError,
  throwForbiddenError,
} from '../../../utils/error-handling';
import { type CreateWaitingListSubscriptionInput } from './schema';
import blockedDomains from '@/data/email-domain-blocklist.json';
import { sendEmail } from '@/lib/email';
import InfluconnectWaitingList from '@/emails/influconnect-waiting-list';
import {
  createWaitingListSubscription,
  getWaitingListSubscriptions,
} from './repository';

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

    const subscriptions = await getWaitingListSubscriptions({
      email: input.email,
    });

    if (subscriptions.length > 0) {
      return {
        message: `Vous avez déjà souscrit à notre liste d'attente. Nous vous informerons lorsque notre plateforme sera disponible. Merci de votre intérét !`,
      };
    }

    await createWaitingListSubscription({
      email: input.email,
    });

    await sendEmail({
      component: InfluconnectWaitingList(),
      subject: 'Bienvenue à bord de InfluConnect ! 🎉',
      to: input.email,
    });

    // Let it run in the background
    ctx.track
      .action({
        type: 'Waitinglist_Subscription',
        details: { email: input.email },
      })
      .catch(() => console.log('Error tracking waitinglist subscription'));

    return {
      message: `Vous êtes inscrit à notre liste d'attente. Nous vous informerons dès que notre plateforme sera disponible. Merci de votre intérêt !`,
    };
  } catch (error) {
    throw throwDbError(error);
  }
};
