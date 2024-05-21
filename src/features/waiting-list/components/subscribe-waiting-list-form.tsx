import { AbsolutePlacement } from '@/components/ui/absolute-placement';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React, { type PropsWithChildren } from 'react';
import { useState } from 'react';

interface SubscribeWaitingListFormProps {
  className?: string;
}

const SubscribeWaitingListForm = ({
  className,
}: PropsWithChildren<SubscribeWaitingListFormProps>) => {
  const [value, setValue] = useState('');

  return (
    <form
      className={cn(
        'relative flex w-full max-w-md flex-col items-center md:flex-row',
        className
      )}
    >
      <Input
        placeholder="Entrez votre email"
        value={value}
        onChange={e => setValue(e.target.value)}
        isFullWidth
        className="bg-white"
      />
      <Button className="mt-3 w-full md:mt-0 md:w-auto">Rejoindre</Button>
    </form>
  );
};

export { SubscribeWaitingListForm };
