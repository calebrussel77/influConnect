import { type ReactNode, createContext } from 'react';

import { type MantineModalsOverride } from '@/components/ui/modal';

import type { ConfirmModalProps } from '../confirm-modal';
import { type ModalProps } from '../modal';

export type ModalSettings = Partial<Omit<ModalProps, 'open'>> & {
  modalId?: string;
};

export type ConfirmLabels = Record<'confirm' | 'cancel', ReactNode>;

export interface OpenConfirmModal extends ModalSettings, ConfirmModalProps {}
export interface OpenContextModal<
  CustomProps extends Record<string, any> = Record<string, never>,
> extends ModalSettings {
  innerProps: CustomProps;
}

export interface ContextModalProps<T extends Record<string, any> = object> {
  context: ModalsContextProps;
  innerProps: T;
  id: string;
}

export type ModalState =
  | { id: string; props: ModalSettings; type: 'content' }
  | { id: string; props: OpenConfirmModal; type: 'confirm' }
  | { id: string; props: OpenContextModal; type: 'context'; ctx: string };

export type MantineModals = MantineModalsOverride['modals'];

export type MantineModal = keyof MantineModals;

export interface ModalsContextProps {
  modals: ModalState[];
  openModal: (props: ModalSettings) => string;
  openConfirmModal: (props: OpenConfirmModal) => string;
  openContextModal: <TKey extends MantineModal>(
    modal: TKey,
    props: OpenContextModal<Parameters<MantineModals[TKey]>[0]>['innerProps']
  ) => string;
  closeModal: (id: string, canceled?: boolean) => void;
  closeContextModal: <TKey extends MantineModal>(
    id: TKey,
    canceled?: boolean
  ) => void;
  closeAll: () => void;
}

export const ModalsContext = createContext<ModalsContextProps>(null as never);
ModalsContext.displayName = '@agorasafe/modals/ModalsContext';
