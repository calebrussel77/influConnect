/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef, type PropsWithChildren } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RevealProps {
  className?: string;
  width?: 'full' | 'fit-content';
  as?: React.ElementType;
}

const Reveal = ({
  className,
  children,
  width = 'fit-content',
  as,
}: PropsWithChildren<RevealProps>) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const animation = useAnimation();

  //@ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const Component = as ? motion[as] : motion.div;

  useEffect(() => {
    if (isInView) {
      void animation.start('visible');
    }
  }, [isInView]);

  return (
    <Component
      ref={ref}
      className={cn(className)}
      style={{
        width: width === 'full' ? '100%' : 'fit-content',
        // overflow: 'hidden',
      }}
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      initial="hidden"
      animate={animation}
      transition={{ ease: 'easeInOut', delay: 0.15 }}
    >
      {children}
    </Component>
  );
};

export { Reveal };
