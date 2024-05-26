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
    onSuccess({ message }) {
      form.reset();
      toast.success(message);
    },
    onError({ message }) {
      toast.error(message);
    },
  });

  const onHandleSubmit = (
    data: z.infer<typeof createWaitingListSubscriptionSchema>
  ) => {
    subscribeToWaitingListMutation.mutate({ email: data.email });
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
        isLoading={subscribeToWaitingListMutation.isPending}
        className="mt-3 w-full md:mt-0 md:w-auto"
      >
        Rejoindre
      </Button>
    </Form>
  );
};

export { SubscribeWaitingListForm };
