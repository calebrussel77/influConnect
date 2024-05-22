import { type ContextModalProps, ModalsProvider } from '@/components/ui/modal';
import { Typography } from '@/components/ui/typography';

const FeedbackFormModal = ({
  context: ctx,
  id,
}: ContextModalProps<Record<string, any>>) => {
  return (
    <div>
      <Typography>
        Are you sure you want to delete your profile? This action is destructive
        and you will have to contact support to restore your data.
      </Typography>
    </div>
  );
};

//TODO: Need to find a way of using dynamic imports whithout typescript errors and continue having autocomplete
export const appModals = {
  feedbackForm: FeedbackFormModal,
};

// neccessary to add type checking of the mantine context modals implementation in the app
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
      modals={appModals}
    >
      {children}
    </ModalsProvider>
  );
};
