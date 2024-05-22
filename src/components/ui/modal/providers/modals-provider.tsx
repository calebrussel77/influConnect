/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useCallback, useReducer, useRef } from 'react';

import { getRandomId } from '@/utils/misc';

import { ConfirmModal } from '../confirm-modal';
import {
  type ConfirmLabels,
  type ContextModalProps,
  type ModalSettings,
  ModalsContext,
  type ModalsContextProps,
  type OpenConfirmModal,
  type OpenContextModal,
} from '../types/context';
import { useModalsEvents } from '../types/events';
import { ContextModalWrapper, ModalWrapper } from '../modal';

import { modalsReducer } from './reducer';

export interface ModalsProviderProps {
  /** Your app */
  children: React.ReactNode;

  /** Predefined modals */
  modals?: Record<string, React.FC<ContextModalProps<any>>>;

  /** Shared Modal component props, applied for every modal */
  modalProps?: ModalSettings;

  /** Confirm modal labels */
  labels?: ConfirmLabels;
}

function separateConfirmModalProps(props: OpenConfirmModal) {
  if (!props) {
    return { confirmProps: {}, modalProps: {} };
  }

  const {
    id,
    children,
    onCancel,
    onConfirm,
    shouldCloseOnConfirm,
    shouldCloseOnCancel,
    cancelProps,
    confirmProps,
    groupProps,
    labels,
    withFooter,
    description,
    title,
    ...others
  } = props;

  return {
    confirmProps: {
      id,
      children,
      onCancel,
      onConfirm,
      shouldCloseOnConfirm,
      shouldCloseOnCancel,
      cancelProps,
      withFooter,
      description,
      title,
      confirmProps,
      groupProps,
      labels,
    },
    modalProps: {
      id,
      ...others,
    },
  };
}

export function ModalsProvider({
  children,
  modalProps,
  labels,
  modals,
}: ModalsProviderProps) {
  const [state, dispatch] = useReducer(modalsReducer, {
    modals: [],
    current: null,
  });

  const stateRef = useRef(state);

  stateRef.current = state;

  const closeAll = useCallback(
    (canceled?: boolean) => {
      dispatch({ type: 'CLOSE_ALL', canceled });
    },
    [dispatch]
  );

  const openModal = useCallback(
    ({ modalId, ...props }: ModalSettings) => {
      const id = modalId ?? getRandomId();

      dispatch({
        type: 'OPEN',
        modal: {
          id,
          type: 'content',
          props,
        },
      });
      return id;
    },
    [dispatch]
  );

  const openConfirmModal = useCallback(
    ({ modalId, ...props }: OpenConfirmModal) => {
      const id = modalId ?? getRandomId();
      dispatch({
        type: 'OPEN',
        modal: {
          id,
          type: 'confirm',
          props,
        },
      });
      return id;
    },
    [dispatch]
  );

  const openContextModal = useCallback(
    (modal: string, { modalId, ...props }: OpenContextModal) => {
      const id = modalId ?? getRandomId();
      dispatch({
        type: 'OPEN',
        modal: {
          id,
          type: 'context',
          props,
          ctx: modal,
        },
      });
      return id;
    },
    [dispatch]
  );

  const closeModal = useCallback(
    (id: string, canceled?: boolean) => {
      dispatch({ type: 'CLOSE', modalId: id, canceled });
    },
    [dispatch]
  );

  useModalsEvents({
    openModal,
    openConfirmModal,
    openContextModal: ({ modal, ...payload }: any) =>
      openContextModal(modal, payload),
    closeModal,
    closeContextModal: closeModal,
    closeAllModals: closeAll,
  });

  const ctx = {
    modals: state.modals,
    openModal,
    openConfirmModal,
    openContextModal,
    closeModal,
    closeContextModal: closeModal,
    closeAll,
  } as ModalsContextProps;

  const getCurrentModal = () => {
    const currentModal = stateRef.current.current;
    switch (currentModal?.type) {
      case 'context': {
        const { innerProps, ...rest } = currentModal.props;
        const ContextModal = modals?.[currentModal.ctx]!;

        return {
          type: currentModal.type,
          modalProps: rest,
          content: (
            <ContextModal
              innerProps={innerProps}
              context={ctx}
              id={currentModal.id}
            />
          ),
        };
      }
      case 'confirm': {
        const {
          modalProps: separatedModalProps,
          confirmProps: separatedConfirmProps,
        } = separateConfirmModalProps(currentModal.props);

        return {
          type: currentModal.type,
          modalProps: separatedModalProps,
          content: (
            <ConfirmModal
              {...separatedConfirmProps}
              id={currentModal.id}
              labels={currentModal.props.labels ?? labels}
            />
          ),
        };
      }
      case 'content': {
        const { children: currentModalChildren, ...rest } = currentModal.props;

        return {
          type: currentModal.type,
          modalProps: rest,
          content: <>{currentModalChildren}</>,
        };
      }
      default: {
        return {
          type: null,
          modalProps: {},
          content: null,
        };
      }
    }
  };

  const { modalProps: currentModalProps, content, type } = getCurrentModal();

  console.log(state.modals.length, 'Modals length');

  return (
    <>
      <ModalsContext.Provider value={ctx}>
        {type === 'context' ? (
          <ContextModalWrapper
            {...modalProps}
            {...currentModalProps}
            open={state.modals.length > 0}
            onClose={() => closeModal(state.current?.id!)}
          >
            {content}
          </ContextModalWrapper>
        ) : (
          <ModalWrapper
            {...modalProps}
            {...currentModalProps}
            open={state.modals.length > 0}
            onClose={() => closeModal(state.current?.id!)}
          >
            {content}
          </ModalWrapper>
        )}
        {children}
      </ModalsContext.Provider>
    </>
  );
}
