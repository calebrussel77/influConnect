import { Typography } from '@/components/ui/typography';
import { SubscribeWaitingListForm } from './subscribe-waiting-list-form';
import { Container } from '@/components/container';
import { Image } from '@/components/ui/image';
import { FlipWords } from '@/components/ui/flip-words';
import AnimatedGridPattern from '@/components/ui/animated-grid-pattern';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/ui/reveal';

export function HeroSection() {
  const companyWords = ['Marques', 'Startups', 'PME'];
  const customerWords = ['Influenceurs', 'Créateurs'];

  return (
    <div className="relative overflow-hidden">
      <Container
        as="section"
        className="relative z-20 mt-16 flex flex-col-reverse items-center justify-between gap-6 xl:flex-row"
      >
        <div className="flex w-full flex-1 flex-col items-center justify-center space-y-6 xl:items-start">
          <Reveal>
            <Typography
              as="h1"
              className="w-full max-w-xl text-center xl:text-left"
            >
              Où les <FlipWords className="text-primary" words={companyWords} />{' '}
              <br /> et les <span className="text-primary">Créateurs</span> se
              rencontrent pour innover
            </Typography>
          </Reveal>
          <Reveal>
            <Typography
              variant="subtle"
              className="w-full max-w-xl text-center xl:text-left"
            >
              Rejoignez la première plateforme qui connecte directement les
              marques avec des créateurs les plus adaptés, pour des campagnes
              authentiques et mesurables.
            </Typography>
          </Reveal>
          <Reveal width="full">
            <SubscribeWaitingListForm className="mx-auto xl:mx-0" />
          </Reveal>
        </div>
        <Reveal>
          <Image
            fill={false}
            width={800}
            height={800}
            src="/images/hero-image.png"
            alt="two persons sitting on a table"
            className="object-top xl:h-[466px] xl:w-auto 2xl:h-[566px]"
          />
        </Reveal>
      </Container>
      <AnimatedGridPattern
        numSquares={250}
        maxOpacity={0.5}
        duration={3}
        repeatDelay={1}
        className={cn(
          '[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]',
          'inset-y-[-40%] -left-[40%] -top-[60%] h-[200%] skew-y-12'
        )}
      />
      <AnimatedGridPattern
        numSquares={180}
        maxOpacity={0.5}
        duration={3}
        repeatDelay={1}
        className={cn(
          '[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]',
          'inset-x-[40%] inset-y-[-20%] h-[100%] skew-y-12'
        )}
      />
    </div>
  );
}
