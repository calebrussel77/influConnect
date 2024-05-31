import { useEffect } from 'react';
import { create } from 'zustand';
import { ContextModalWrapper } from './ui/modal/modal';
import { immer } from 'zustand/middleware/immer';
import { useDisclosure } from '@/hooks/use-disclosure';
import { Typography } from './ui/typography';
import { Button } from './ui/button';
import { api } from '@/utils/api';

export function UpdateRequiredWatcher() {
  const isRequireUpdate = useIsUpdatedRequired();
  const { isOpen, onClose } = useDisclosure(false);
  const canShowAlert = isRequireUpdate && !isOpen;

  const updateClientMutation = api.client.updateVersion.useMutation({
    onSuccess() {
      window.location.reload();
    },
  });

  if (!canShowAlert) return null;

  return (
    <ContextModalWrapper
      onClose={onClose}
      open={canShowAlert}
      withCloseButton={false}
      closeOnClickOutside={false}
      title="🎉 Nouvelle version disponible !"
      footer={
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={onClose}>
            😬 Non. Je continue à mes risques et périls.
          </Button>
          <Button
            isLoading={updateClientMutation.isPending}
            onClick={() => updateClientMutation.mutate()}
          >
            Mettre à jour maintenant{' '}
          </Button>
        </div>
      }
    >
      <Typography>
        Il est temps d'actualiser votre navigateur pour bénéficier des dernières
        fonctionnalités. Si vous ne le faites pas, les choses risquent de ne pas
        fonctionner comme prévu.
      </Typography>
    </ContextModalWrapper>
  );
}

type UpdateRequiredStore = {
  updateRequired: boolean;
  setUpdateRequired: (value: boolean) => void;
};

const useUpdateRequiredStore = create<UpdateRequiredStore>()(
  immer<UpdateRequiredStore>(set => ({
    updateRequired: false,
    setUpdateRequired: value => {
      set(state => {
        state.updateRequired = value;
      });
    },
  }))
);

let originalFetch: typeof window.fetch | undefined;

export const useIsUpdatedRequired = () => {
  const isRequireUpdate = useUpdateRequiredStore(state => state.updateRequired);
  const setUpdateRequired = useUpdateRequiredStore(
    state => state.setUpdateRequired
  );

  useEffect(() => {
    if (originalFetch ?? typeof window === 'undefined') return;
    originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const response = await originalFetch!(...args);
      if (response.headers.has('X-Update-Required')) {
        setUpdateRequired(true);
      }
      return response;
    };
  }, []);

  return isRequireUpdate;
};
