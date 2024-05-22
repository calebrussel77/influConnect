/* eslint-disable @typescript-eslint/no-misused-promises */

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

import { Button, type ButtonProps } from '../button';
import { type ConfirmLabels } from './types/context';
import { ModalFooter, ModalHeader, ModalMain } from './modal';
import { useModals } from './hooks/use-modals';
import { useIsComputer, useIsMobile } from '@/hooks/use-beakpoints';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../drawer';

export interface ConfirmModalProps {
  id?: string;
  children?: React.ReactNode;
  hidePaddingContent?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  onCancel?: () => void | Promise<void>;
  onConfirm?: () => void | Promise<void>;
  shouldCloseOnConfirm?: boolean;
  shouldCloseOnCancel?: boolean;
  withFooter?: boolean;
  cancelProps?: ButtonProps & React.ComponentPropsWithoutRef<'button'>;
  confirmProps?: ButtonProps & React.ComponentPropsWithoutRef<'button'>;
  groupProps?: React.HTMLAttributes<HTMLDivElement>;
  labels?: ConfirmLabels;
}

export function ConfirmModal({
  id,
  cancelProps,
  confirmProps,
  labels = { cancel: '', confirm: '' },
  shouldCloseOnConfirm = true,
  shouldCloseOnCancel = true,
  withFooter = true,
  groupProps,
  onCancel,
  onConfirm,
  children,
  title,
  description,
  hidePaddingContent,
}: ConfirmModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { cancel: cancelLabel, confirm: confirmLabel } = labels;
  const ctx = useModals();
  const isComputer = useIsComputer();
  const hasHeader = !!(title ?? description);

  const handleCancel = async (event: React.MouseEvent<HTMLButtonElement>) => {
    typeof cancelProps?.onClick === 'function' && cancelProps?.onClick(event);
    typeof onCancel === 'function' && (await onCancel());
    shouldCloseOnCancel && ctx.closeModal(id!);
  };

  const handleConfirm = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    typeof confirmProps?.onClick === 'function' && confirmProps?.onClick(event);
    typeof onConfirm === 'function' && (await onConfirm());
    setIsLoading(false);
    shouldCloseOnConfirm && ctx.closeModal(id!);
  };

  if (isComputer)
    return (
      <>
        {hasHeader && (
          <ModalHeader
            title={title}
            description={description}
            onClose={handleCancel}
          />
        )}

        {children && (
          <ModalMain className={hidePaddingContent ? 'p-0' : ''}>
            {children}
          </ModalMain>
        )}

        {withFooter && (
          <ModalFooter
            {...groupProps}
            className={cn('border-none', groupProps?.className)}
          >
            <Button variant="ghost" {...cancelProps} onClick={handleCancel}>
              {cancelProps?.children ?? cancelLabel}
            </Button>

            <Button
              {...confirmProps}
              isLoading={isLoading}
              onClick={handleConfirm}
            >
              {confirmProps?.children ?? confirmLabel}
            </Button>
          </ModalFooter>
        )}
      </>
    );

  return (
    <>
      {hasHeader && (
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
      )}
      <div className={hidePaddingContent ? 'p-0' : 'p-4'}>{children}</div>
      {withFooter && (
        <DrawerFooter>
          <Button
            {...confirmProps}
            isLoading={isLoading}
            onClick={handleConfirm}
          >
            {confirmProps?.children ?? confirmLabel}
          </Button>
          <Button variant="ghost" {...cancelProps} onClick={handleCancel}>
            {cancelProps?.children ?? cancelLabel}
          </Button>
        </DrawerFooter>
      )}
    </>
  );
}
