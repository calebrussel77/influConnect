import React from 'react';

import { createContextModal } from '@/components/ui/modal';
import { SubscribeWaitingListForm } from './subscribe-waiting-list-form';

const { openModal, Modal } = createContextModal<Record<string, any>>({
  name: 'subscribeWaitingList',
  title: "📑 Souscrire à la liste d'attente",
  description:
    "Rejoignez +100 personnes déjà inscrites à notre liste d'attente. Inscrivez-vous maintenant !",
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
