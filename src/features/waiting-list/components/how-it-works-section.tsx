import { Typography } from '@/components/ui/typography';
import { Container } from '@/components/container';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/ui/reveal';
import { openContext } from '@/providers/modals-manager-provider';

const steps = [
  {
    number: '1',
    mobilePosition: 'top-[66px] -left-4',
    tabletPosition: 'top-[68px] left-[172px]',
    desktopPosition: 'bottom-[108px] left-12 2xl:bottom-[104px]',
    title: 'Inscrivez-vous et créez votre profil',
    description:
      'Remplissez votre profil en quelques minutes et accédez à des influenceurs triés sur le volet.',
  },
  {
    number: '2',
    mobilePosition: 'top-[220px] -left-5',
    tabletPosition: 'top-[240px] left-[172px]',
    desktopPosition: 'right-[40%] top-[344px] 2xl:right-[52%] 2xl:top-[376px]',
    title: 'Lancez une Campagne',
    description:
      'Définissez vos objectifs, sélectionnez des créateurs, et lancez votre campagne en toute simplicité.',
  },
  {
    number: '3',
    mobilePosition: 'top-[360px] -left-[26px]',
    tabletPosition: 'top-[412px] left-[162px]',
    desktopPosition: 'right-[75px] top-[268px] 2xl:right-[26%] 2xl:top-[310px]',
    title: 'Suivez et Analysez',
    description:
      'Utilisez notre tableau de bord pour suivre les performances en temps réel et obtenir des rapports détaillés.',
  },
  {
    number: '4',
    mobilePosition: 'top-[530px] left-0',
    tabletPosition: '-bottom-[20px] left-[42px]',
    desktopPosition:
      '-bottom-[20px] -right-[131px] top-[70px] 2xl:right-[6%] 2xl:top-[60px]',
    title: 'Recevez des résultats et payer les créateurs',
    description:
      'Obtenez des résultats mesurables et assurez-vous que les paiements soient effectués de manière sécurisée.',
  },
];

export function HowItWorksSection() {
  return (
    <Container
      id="how-it-works"
      as="section"
      className="flex items-start justify-between gap-3"
    >
      <div className="relative flex w-full flex-1 flex-col">
        <div className="relative z-20 mx-auto w-full max-w-lg space-y-6 text-center xl:mx-0 xl:text-left">
          <Reveal width="full">
            <Typography as="small" className="font-bold uppercase text-primary">
              Procédures
            </Typography>
          </Reveal>

          <div className="mt-4 flex flex-col gap-3">
            <Reveal width="full">
              <Typography as="h2">
                Comment ça <br /> marche ?
              </Typography>
            </Reveal>
            <Reveal width="full">
              <Typography variant="description">
                Nous avons simplifié le processus de marketing d'influence pour
                que vous puissiez vous concentrer sur ce qui compte le plus :
                votre croissance. Inscrivez-vous, lancez une campagne, suivez
                vos résultats, et payez vos influenceurs, tout cela en un seul
                endroit.
              </Typography>
            </Reveal>
          </div>
          <Reveal width="full">
            <Button onClick={() => openContext('subscribeWaitingList', {})}>
              Commencer
            </Button>
          </Reveal>
        </div>
        {steps?.map((step, idx) => (
          <div
            key={idx}
            className={cn(
              'absolute z-20 hidden w-full max-w-xs xl:block',
              step.desktopPosition
            )}
          >
            <Reveal>
              <div className="relative flex flex-row gap-6 xl:flex-col">
                <div className="absolute -bottom-4 right-12 z-10 text-9xl font-extrabold opacity-15">
                  {step.number}
                </div>
                <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border bg-white shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-primary" />
                </div>
                <div className="relative z-20 space-y-3">
                  <Typography as="h5" className="font-extrabold">
                    {step.title}
                  </Typography>
                  <Typography className="text-sm text-muted-foreground">
                    {step.description}
                  </Typography>
                </div>
              </div>
            </Reveal>
          </div>
        ))}
        <Image
          fill={false}
          width={1080}
          height={1080}
          withAnimation={false}
          src="/images/lines-vector-xl.png"
          alt="two persons sitting on a table"
          className="-mt-[138px] hidden h-[580px] w-auto object-contain xl:block"
        />

        {/* Mobile aspects  */}
        <div className="relative mx-auto block w-full max-w-md md:hidden">
          {steps?.map((step, idx) => (
            <div
              key={step.title}
              className={cn('absolute z-20 w-full', step.mobilePosition)}
            >
              <Reveal>
                <div className="relative flex flex-row gap-6 xl:flex-col">
                  <div className="absolute -bottom-4 right-6 z-10 text-8xl font-extrabold opacity-15">
                    {idx + 1}
                  </div>
                  <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border bg-white shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-primary" />
                  </div>
                  <div className="relative z-20 space-y-3">
                    <Typography as="h5" className="font-extrabold">
                      {step.title}
                    </Typography>
                    <Typography className="text-sm text-muted-foreground">
                      {step.description}
                    </Typography>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
          <Image
            fill={false}
            width={1080}
            height={1080}
            withAnimation={false}
            src="/images/lines-vector-sm.png"
            alt="two persons sitting on a table"
            className="-ml-3 mt-6 block h-[620px] w-auto object-contain"
          />
        </div>

        {/* Tablets aspects  */}
        <div className="relative mx-auto hidden w-full max-w-md md:block xl:hidden">
          {steps?.map((step, idx) => (
            <div
              key={step.title}
              className={cn('absolute z-20 w-full', step.tabletPosition)}
            >
              <Reveal>
                <div className="relative flex flex-row gap-6 xl:flex-col">
                  <div className="absolute -bottom-4 right-12 z-10 text-8xl font-extrabold opacity-15">
                    {idx + 1}
                  </div>
                  <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border bg-white shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-primary" />
                  </div>
                  <div className="relative z-20 space-y-3">
                    <Typography as="h5" className="font-extrabold">
                      {step.title}
                    </Typography>
                    <Typography className="text-sm text-muted-foreground">
                      {step.description}
                    </Typography>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
          <Reveal>
            <Image
              fill={false}
              width={1080}
              height={1080}
              withAnimation={false}
              src="/images/lines-vector-md.png"
              alt="two persons sitting on a table"
              className="mt-6 block h-[680px] w-auto object-contain"
            />
          </Reveal>
        </div>
      </div>
    </Container>
  );
}
