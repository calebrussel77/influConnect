import { type ModalProps } from '../modal';
import { type ContextModalProps } from '../types/context';
import { modals } from '../types/events';

type ContextProps<T extends Record<string, unknown>> = {
  context: {
    close: () => void;
  };
  props: T;
};

type CreateContextModalProps<T extends Record<string, unknown>> = {
  name: string;
  Element:
    | React.ForwardRefExoticComponent<ContextProps<T>>
    | ((props: ContextProps<T>) => JSX.Element);
} & Partial<Omit<ModalProps, 'open'>>;

export function createContextModal<T extends Record<string, unknown>>({
  name,
  Element,
  ...modalProps
}: CreateContextModalProps<T>) {
  const openModal = (
    innerProps: T,
    overrideModalProps?: Omit<ModalProps, 'open' | 'onClose'>
  ) => {
    modals.openContextModal({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      modal: name as any,
      ...modalProps,
      ...overrideModalProps,
      onClose: () => {
        //TODO: fix the scrolling this was causing...
        // history.scrollRestoration = 'manual';
        // if (location.href.includes('#')) history.back();
        modalProps.onClose?.();
      },
      innerProps,
    });
  };

  function Modal({ context, id, innerProps }: ContextModalProps<T>) {
    const onClose = () => context.closeModal(id);
    return <Element context={{ close: onClose }} props={innerProps} />;
  }

  return { openModal, Modal };
}
