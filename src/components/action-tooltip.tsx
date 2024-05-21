import { type ComponentProps, type ReactNode } from 'react';

import { Tooltip } from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';

type ActionTooltipProps = ComponentProps<typeof Tooltip.Content> & {
  label: ReactNode;
};

export const ActionTooltip = ({
  label,
  children,
  asChild = true,
  hasArrow = true,
  className,
  ...rest
}: ActionTooltipProps) => {
  return (
    <Tooltip delayDuration={50}>
      <Tooltip.Trigger asChild={asChild}>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          hasArrow={hasArrow}
          className={cn('text-xs leading-6', className)}
          {...rest}
        >
          {label}
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip>
  );
};
