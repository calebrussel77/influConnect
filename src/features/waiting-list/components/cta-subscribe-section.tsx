import { Container } from '@/components/container';
import { Typography } from '@/components/ui/typography';
import React, { type PropsWithChildren } from 'react';
import { SubscribeWaitingListForm } from './subscribe-waiting-list-form';
import { Image } from '@/components/ui/image';

interface CtaSubscribeSectionProps {
  className?: string;
}

const CtaSubscribeSection =
  ({}: PropsWithChildren<CtaSubscribeSectionProps>) => {
    return (
      <section className="relative h-[470px] overflow-hidden bg-brand-800 py-16 md:h-[420px] md:py-20">
        <Image
          fill={false}
          height={1620}
          width={1620}
          src="/images/cta-lines-bg.png"
          alt="two persons sitting on a table"
          className="absolute -bottom-28 left-0 h-[800px] w-full object-contain opacity-30 md:-bottom-24 md:h-[680px]"
        />
        <Container className="relative flex flex-col items-center justify-center gap-8">
          <div className="relative flex flex-col items-center gap-3 text-white">
            <Typography as="h2" className="text-center">
              Soyez les premiers informés !
            </Typography>
            <Typography
              variant="description"
              className="w-full max-w-2xl text-center text-gray-300"
            >
              Inscrivez-vous dès maintenant pour être parmi les premiers à
              découvrir comment InfluConnect peut transformer votre stratégie de
              marketing d'influence.
            </Typography>
          </div>
          <SubscribeWaitingListForm />
        </Container>
      </section>
    );
  };

export { CtaSubscribeSection };
