import React, { useEffect, useRef, type PropsWithChildren } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RevealProps {
  className?: string;
  width?: 'full' | 'fit-content';
}

const Reveal = ({
  className,
  children,
  width = 'fit-content',
}: PropsWithChildren<RevealProps>) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const animation = useAnimation();

  useEffect(() => {
    if (isInView) {
      void animation.start('visible');
    }
  }, [isInView]);

  return (
    <motion.div
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
    </motion.div>
  );
};

export { Reveal };
