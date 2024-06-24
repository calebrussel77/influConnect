/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Button } from '@/components/ui/button';
import { Form, InputText, useZodForm } from '@/components/ui/form';
import { useIsMobile } from '@/hooks/use-beakpoints';
import { fbp } from '@/lib/fb-pixel';
import { cn } from '@/lib/utils';
import { createWaitingListSubscriptionSchema } from '@/server/api/modules/waiting-list/schema';
import { api } from '@/utils/api';
import React, { type PropsWithChildren } from 'react';
import { toast } from 'sonner';
import { type z } from 'zod';

interface SubscribeWaitingListFormProps {
  className?: string;
  onSuccess?: () => void;
}

const SubscribeWaitingListForm = ({
  className,
  onSuccess,
}: PropsWithChildren<SubscribeWaitingListFormProps>) => {
  const isMobile = useIsMobile();

  const form = useZodForm({
    schema: createWaitingListSubscriptionSchema,
  });

  const subscribeToWaitingListMutation = api.waitingList.subscribe.useMutation({
    onSuccess({ message, email }) {
      fbp.event('Subscribed to Wainting List', { email });
      form.reset({ email: '', name: '' });
      toast.success(message);
      onSuccess?.();
    },
    onError({ message }) {
      toast.error(message);
    },
  });

  const onHandleSubmit = (
    data: z.infer<typeof createWaitingListSubscriptionSchema>
  ) => {
    subscribeToWaitingListMutation.mutate({
      email: data.email,
      name: data.name,
    });
  };

  return (
    <Form
      onSubmit={onHandleSubmit}
      gap="none"
      form={form}
      className={cn(
        'relative flex w-full max-w-lg flex-col items-start gap-3 md:flex-row',
        className
      )}
    >
      <InputText
        name="name"
        autoFocus={!isMobile}
        placeholder="Nom"
        isFullWidth
        required
      />
      <InputText
        name="email"
        placeholder="Adresse email"
        isFullWidth
        required
      />
      <Button
        isLoading={subscribeToWaitingListMutation.isPending}
        className="mt-3 w-full md:mt-0 md:w-auto"
      >
        Rejoindre
      </Button>
    </Form>
  );
};

export { SubscribeWaitingListForm };
