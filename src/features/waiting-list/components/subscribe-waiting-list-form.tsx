/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Button } from '@/components/ui/button';
import { Form, InputText, useZodForm } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { createWaitingListSubscriptionSchema } from '@/server/api/modules/waiting-list/waiting-list.schema';
import { api } from '@/utils/api';
import React, { type PropsWithChildren } from 'react';
import { toast } from 'sonner';
import { type z } from 'zod';

interface SubscribeWaitingListFormProps {
  className?: string;
}

const SubscribeWaitingListForm = ({
  className,
}: PropsWithChildren<SubscribeWaitingListFormProps>) => {
  const form = useZodForm({
    schema: createWaitingListSubscriptionSchema,
  });

  const subscribeToWaitingListMutation = api.waitingList.subscribe.useMutation({
    onSuccess() {
      form.reset();
    },
  });

  const onHandleSubmit = (
    data: z.infer<typeof createWaitingListSubscriptionSchema>
  ) => {
    toast.promise(
      subscribeToWaitingListMutation.mutateAsync({ email: data.email }),
      {
        loading: 'Chargement...',
        success(data) {
          return data.message;
        },
        error(error: Error) {
          return error?.message;
        },
      }
    );
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
        name="email"
        placeholder="Entrez votre email"
        isFullWidth
        required
      />
      <Button
        disabled={subscribeToWaitingListMutation.isPending}
        className="mt-3 w-full md:mt-0 md:w-auto"
      >
        Rejoindre
      </Button>
    </Form>
  );
};

export { SubscribeWaitingListForm };
