import React from 'react';

import { createContextModal } from '@/components/ui/modal';
import { SubscribeWaitingListForm } from './subscribe-waiting-list-form';

const { openModal, Modal } = createContextModal<Record<string, any>>({
  name: 'subscribeWaitingList',
  title: "📑 Souscrire à la liste d'attente",
  description:
    "Rejoignez +100 professionnels déjà inscrits à notre liste d'attente, pour révolutionner le marketing d'influence. Inscrivez-vous maintenant et soyez parmi les premiers à transformer votre stratégie!",
  Element: ({ context, props }) => {
    return (
      <div className="flex w-full justify-center">
        <SubscribeWaitingListForm onSuccess={context.close} />
      </div>
    );
  },
});

export {
  openModal as openSubscribeWaitingListModal,
  Modal as SubscribeWaitingListModal,
};
