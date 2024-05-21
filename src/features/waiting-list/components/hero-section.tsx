import { Typography } from '@/components/ui/typography';
import { SubscribeWaitingListForm } from './subscribe-waiting-list-form';
import { Container } from '@/components/container';
import { Image } from '@/components/ui/image';

export function HeroSection() {
  return (
    <Container
      as="section"
      className="mt-16 flex flex-col-reverse items-center justify-between gap-6 xl:flex-row"
    >
      <div className="flex w-full flex-1 flex-col items-center justify-center space-y-6 xl:items-start">
        <Typography
          as="h1"
          className="w-full max-w-xl text-center xl:text-left"
        >
          Où les <span className="text-primary">marques</span> et les{' '}
          <span className="text-primary">créateurs</span> se rencontrent pour
          innover
        </Typography>
        <Typography
          variant="subtle"
          className="w-full max-w-xl text-center xl:text-left"
        >
          Rejoignez la première plateforme qui connecte directement les marques
          avec des créateurs les plus adaptés, pour des campagnes authentiques
          et mesurables.
        </Typography>
        <SubscribeWaitingListForm className="mx-auto xl:mx-0" />
      </div>
      <Image
        fill={false}
        width={800}
        height={800}
        src="/images/hero-image.png"
        alt="two persons sitting on a table"
        className="object-top xl:h-[566px] xl:w-auto"
      />
    </Container>
  );
}
