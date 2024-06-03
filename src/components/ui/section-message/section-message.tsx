import { type VariantProps, cva } from 'class-variance-authority';
import {
  AlertTriangle,
  HelpCircle,
  InfoIcon,
  MailQuestion,
  ShieldCheckIcon,
  X,
} from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import React, {
  type ReactElement,
  type ReactNode,
  forwardRef,
  useState,
} from 'react';

import { isArray } from '@/utils/type-guards';

import { cn } from '@/lib/utils';

import { Inline } from '../inline';
import { MessageAction } from './section-message-action';

const sectionMessage = cva('w-full', {
  variants: {
    appareance: {
      danger: [
        'bg-red-600 text-white',
        // 'border-transparent',
      ],
      discovery: [
        'bg-pink-600 text-white',
        // 'border-transparent',
      ],
      success: [
        'bg-green-600 text-white',
        // 'border-transparent',
      ],
      warning: ['bg-yellow-600 text-white'],
      info: ['bg-brand-600 text-white'],
      system: ['bg-gradient-to-bl to-brand-600 from-purple-400 text-white'],
    },
    size: {
      small: ['text-sm', 'py-2.5', 'px-4'],
      medium: ['text-base', 'py-2', 'px-4'],
      large: ['text-lg', 'py-3', 'px-6'],
    },
  },
  compoundVariants: [{ appareance: 'danger', size: 'medium' }],
  defaultVariants: {
    appareance: 'danger',
    size: 'small',
  },
});

type ClassNames = {
  root: string;
  icon: string;
  wrapper: string;
  title: string;
  description: string;
};

type SectionMessageOptions = {
  className?: string;
  classNames?: Partial<ClassNames>;
  isSticky?: boolean;
  title?: ReactNode;
  description?: ReactNode;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  actions?: Array<ReactElement<unknown>> | ReactElement<unknown>;
  hasCloseButton?: boolean;
};

const IconAppareances = {
  danger: {
    icon: InfoIcon,
    color: ' text-white',
  },
  success: {
    icon: CheckCircle2,
    color: ' text-white',
  },
  discovery: {
    icon: HelpCircle,
    color: 'text-white',
  },
  system: {
    icon: ShieldCheckIcon,
    color: 'text-white',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-white',
  },
  info: { icon: InfoIcon, color: 'text-white' },
};

export type SectionMessageProps = VariantProps<typeof sectionMessage> &
  SectionMessageOptions;

const SectionMessage = forwardRef<HTMLDivElement, SectionMessageProps>(
  (
    {
      className,
      appareance = 'danger',
      onClose,
      hasCloseButton = true,
      size,
      title,
      isSticky = false,
      actions,
      description,
      classNames,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);
    const isActionsArray = isArray(actions);

    const Icon =
      appareance && IconAppareances[appareance]
        ? IconAppareances[appareance].icon
        : MailQuestion;

    const iconColor =
      appareance && IconAppareances[appareance]
        ? IconAppareances[appareance].color
        : '';

    const toggleVisible = () => setIsVisible(false);

    return (
      <>
        {isVisible && (
          <div
            ref={ref}
            role="alert"
            className={cn(
              'relative mb-3 w-full rounded-sm',
              sectionMessage({ appareance, size, class: className }),
              isSticky && 'sticky top-0 z-40 w-full',
              classNames?.root
            )}
            {...props}
          >
            <div
              className={cn(
                'flex w-full items-start gap-3',
                classNames?.wrapper
              )}
            >
              <Icon
                className={cn(
                  'h-6 w-6 flex-shrink-0',
                  iconColor,
                  classNames?.icon
                )}
              />
              <div
                className={cn(
                  'flex w-full flex-col items-start gap-3',
                  !isActionsArray &&
                    'flex flex-col items-start justify-center gap-3 md:flex-row md:justify-between'
                )}
              >
                <div className="space-y-1">
                  {title && (
                    <h3
                      className={cn('text-sm font-semibold', classNames?.title)}
                    >
                      {title}
                    </h3>
                  )}
                  {description && (
                    <div className={cn('text-sm', classNames?.description)}>
                      {description}
                    </div>
                  )}
                </div>
                {isActionsArray
                  ? actions?.length > 0 && (
                      <Inline
                        divider={<span className="text-white">&middot;</span>}
                        className="gap-1"
                      >
                        {actions}
                      </Inline>
                    )
                  : actions}
              </div>
            </div>
            {hasCloseButton && (
              <button
                type="button"
                onClick={onClose ?? toggleVisible}
                className="absolute right-2 top-2 transform rounded-full bg-white/20 p-0.5 transition duration-150 hover:scale-105"
              >
                <X className="h-4 w-4 flex-shrink-0" />
              </button>
            )}
          </div>
        )}
      </>
    );
  }
);

SectionMessage.displayName = 'SectionMessage';

export { SectionMessage, MessageAction as SectionMessageAction };
