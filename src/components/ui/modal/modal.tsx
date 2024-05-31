/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Typography } from '../typography';
import { CloseButton } from '../close-button';
import { useIsComputer } from '@/hooks/use-beakpoints';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../drawer';
import { cva } from 'class-variance-authority';
import { NoSSR } from '../no-ssr';

type ClassNames = {
  title?: string;
  description?: string;
};

const Dialog = DialogPrimitive.Root;

const dialogVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right:
          'inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
);

const DialogPortal = ({
  children,
  ...props
}: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal>{children}</DialogPrimitive.Portal>
);

DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-background/60 backdrop-blur-sm transition-all duration-300 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    isFullScreen?: boolean;
  }
>(({ className, children, isFullScreen = false, ...props }, ref) => {
  return (
    <DialogPrimitive.Content
      ref={ref}
      style={{
        maxHeight: isFullScreen ? '100vh' : `calc(100vh - 4rem * 2)`,
      }}
      className={cn(
        'scrollbar__custom fixed z-50 focus:outline-none',
        'rounded-lg border bg-background shadow-lg',
        'focus:ring-0 focus:ring-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent',
        'transition duration-200 ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out',
        isFullScreen
          ? [
              'inset-x-0 bottom-0 h-full overflow-y-auto rounded-none shadow-none',
              'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
              'data-[state=closed]:duration-300 data-[state=open]:duration-500',
            ]
          : [
              'left-[50%] top-[50%] grid w-full max-w-xl translate-x-[-50%] translate-y-[-50%]',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
              'data-[state=closed]:slide-out-to-left-1/2 ',
              'data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
            ],
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  );
});

DialogContent.displayName = DialogPrimitive.Content.displayName;

export type ModalHeaderProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> & {
  withCloseButton?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  classNames?: Pick<ClassNames, 'title' | 'description'>;
  onClose?: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => Promise<void> | void;
};

const DialogHeader = ({
  className,
  title,
  withCloseButton = true,
  classNames,
  description,
  onClose,
  ...props
}: ModalHeaderProps) => (
  <div
    className={cn(
      'sticky inset-x-0 top-0 flex w-full flex-row items-start justify-between bg-background px-4 py-4 sm:px-6',
      'z-30 border-b',
      className
    )}
    {...props}
  >
    <div className="flex w-full flex-col space-y-1.5 text-left">
      {title && (
        <DialogTitle className={classNames?.title}>{title}</DialogTitle>
      )}
      {description && (
        <DialogDescription className={classNames?.description}>
          {description}
        </DialogDescription>
      )}
    </div>
    {withCloseButton && (
      <DialogPrimitive.Close asChild>
        <CloseButton
          onClick={onClose}
          size="md"
          className="absolute right-2 top-3 sm:right-3"
        />
      </DialogPrimitive.Close>
    )}
  </div>
);

DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'sticky inset-x-0 bottom-0 flex flex-col-reverse gap-3 bg-background px-4 py-3 sm:flex-row sm:justify-end sm:space-x-2 sm:px-6',
        'z-30 border-t',
        className
      )}
      {...props}
    />
  );
};

const DialogMain = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('h-full flex-1 px-4 py-6', className)} {...props} />
  );
};

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'line-clamp-1 text-xl font-semibold tracking-tight',
      className
    )}
    {...props}
  />
));

DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, onClick, ...props }, ref) => (
  <DialogPrimitive.Description onClick={onClick} ref={ref} asChild>
    <Typography
      variant="subtle"
      className={cn('text-sm leading-6', className)}
      {...props}
    />
  </DialogPrimitive.Description>
));

DialogDescription.displayName = DialogPrimitive.Description.displayName;

export interface ModalProps
  extends Pick<
    React.ComponentPropsWithoutRef<typeof Dialog>,
    'open' | 'onOpenChange' | 'children' | 'defaultOpen'
  > {
  className?: string;
  style?: React.CSSProperties;
  isFullScreen?: boolean;
  closeOnClickOutside?: boolean;
  hidePaddingContent?: boolean;
  withCloseButton?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  onClose?: () => void;
}

const ContextModal = React.forwardRef<
  React.ElementRef<typeof Dialog>,
  ModalProps
>(
  (
    {
      open,
      onOpenChange,
      children,
      className,
      isFullScreen,
      style,
      closeOnClickOutside = true,
      hidePaddingContent = false,
      withCloseButton,
      title,
      description,
      footer,
      onClose,
      ...rest
    },
    ref
  ) => {
    const isComputer = useIsComputer();
    const hasHeader = !!(title ?? description);

    const handleInteractOutside = (event: Event) => {
      if (!closeOnClickOutside || isFullScreen) {
        event?.preventDefault();
      } else {
        onOpenChange?.(false);
        onClose?.();
      }
    };

    if (isComputer || isFullScreen) {
      return (
        <Dialog open={open} {...rest}>
          <DialogPortal>
            {!isFullScreen && <DialogOverlay />}
            <DialogContent
              ref={ref}
              onInteractOutside={handleInteractOutside}
              isFullScreen={isFullScreen}
              className={cn(className)}
              style={style}
            >
              <>
                {hasHeader && (
                  <DialogHeader
                    title={title}
                    description={description}
                    withCloseButton={withCloseButton}
                    onClose={onClose}
                  />
                )}
                <DialogMain
                  className={cn(
                    'relative',
                    hidePaddingContent ? 'p-0' : undefined
                  )}
                >
                  {children}
                </DialogMain>
                {footer && <DialogFooter>{footer}</DialogFooter>}
              </>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      );
    }

    return (
      <NoSSR>
        <Drawer
          onClose={onClose}
          dismissible={!isFullScreen || !closeOnClickOutside}
          open={open}
          {...rest}
        >
          <DrawerContent
            onInteractOutside={handleInteractOutside}
            ref={ref}
            isFullScreen={isFullScreen}
          >
            {hasHeader && (
              <DrawerHeader className="text-left">
                <DrawerTitle>{title}</DrawerTitle>
                <DrawerDescription>{description}</DrawerDescription>
              </DrawerHeader>
            )}
            <div className={cn('relative', hidePaddingContent ? 'p-0' : 'p-4')}>
              {children}
            </div>
            {footer && <DrawerFooter>{footer}</DrawerFooter>}
          </DrawerContent>
        </Drawer>
      </NoSSR>
    );
  }
);
ContextModal.displayName = 'ContextModal';

const Modal = React.forwardRef<
  React.ElementRef<typeof Dialog>,
  Omit<ModalProps, 'title' | 'description' | 'footer'>
>(
  (
    {
      open,
      children,
      className,
      isFullScreen = false,
      style,
      closeOnClickOutside = true,
      onClose,
      ...rest
    },
    ref
  ) => {
    const isComputer = useIsComputer();

    const handleInteractOutside = (event: Event) => {
      if (!closeOnClickOutside || isFullScreen) {
        event?.preventDefault();
      } else {
        onClose?.();
      }
    };

    if (isComputer || isFullScreen) {
      return (
        <Dialog open={open} {...rest}>
          <DialogPortal>
            {!isFullScreen && <DialogOverlay />}
            <DialogContent
              ref={ref}
              onInteractOutside={handleInteractOutside}
              isFullScreen={isFullScreen}
              className={cn(className)}
              style={style}
            >
              {children}
            </DialogContent>
          </DialogPortal>
        </Dialog>
      );
    }

    return (
      <NoSSR>
        <Drawer
          onClose={onClose}
          dismissible={!isFullScreen || !closeOnClickOutside}
          open={open}
          {...rest}
        >
          <DrawerContent
            ref={ref}
            isFullScreen={isFullScreen}
            onInteractOutside={handleInteractOutside}
          >
            {children}
          </DrawerContent>
        </Drawer>
      </NoSSR>
    );
  }
);
Modal.displayName = 'Modal';

export {
  Modal as ModalWrapper,
  ContextModal as ContextModalWrapper,
  DialogMain as ModalMain,
  DialogFooter as ModalFooter,
  DialogHeader as ModalHeader,
};
