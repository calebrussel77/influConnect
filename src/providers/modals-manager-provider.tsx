/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  type ContextModalProps,
  ModalsProvider,
  type ModalProps,
} from '@/components/ui/modal';
import { Typography } from '@/components/ui/typography';
import {
  openSubscribeWaitingListModal,
  SubscribeWaitingListModal,
} from '@/features/waiting-list';

const FeedbackFormModal = ({
  context: ctx,
  id,
}: ContextModalProps<Record<string, any>>) => {
  return (
    <div>
      <Typography>Test...</Typography>
    </div>
  );
};

const registry = {
  subscribeWaitingList: {
    Component: SubscribeWaitingListModal,
    fn: openSubscribeWaitingListModal,
  },
};

export const appModals = {
  feedbackForm: FeedbackFormModal,
};

// neccessary to add type checking of the modal context in the app
declare module '@/components/ui/modal' {
  export interface MantineModalsOverride {
    modals: typeof appModals;
  }
}

export const ModalsManagerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ModalsProvider
      labels={{
        confirm: 'Confirmer',
        cancel: 'Annuler',
      }}
      modals={
        {
          ...appModals,
          ...(
            Object.keys(registry) as Array<keyof typeof registry>
          ).reduce<any>((acc, key) => {
            acc[key] = registry[key].Component;
            return acc;
          }, {}),
        } as Record<string, React.FC<ContextModalProps<any>>>
      }
    >
      {children}
    </ModalsProvider>
  );
};

export function openContext<TName extends keyof typeof registry>(
  modal: TName,
  props: Parameters<(typeof registry)[TName]['fn']>[0],
  modalProps?: Omit<ModalProps, 'open' | 'onClose'>
) {
  registry[modal].fn(props as any, modalProps);
}
