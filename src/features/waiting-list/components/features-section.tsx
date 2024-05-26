import { Typography } from '@/components/ui/typography';
import { Container } from '@/components/container';
import { Image } from '@/components/ui/image';
import {
  BadgeCheck,
  BarChart4,
  CircleDollarSign,
  Handshake,
} from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';

const features = [
  {
    icon: <BadgeCheck className="h-6 w-6" />,
    title: 'Accès à des Influenceurs Vérifiés',
    description:
      'Trouvez les créateurs parfaits pour votre marque grâce à notre sélection rigoureuse.',
  },
  {
    icon: <Handshake className="h-6 w-6" />,
    title: 'Opportunités de collaboration',
    description:
      'En tant que créateur, Accédez à des collaboration uniques et sécurisez vos paiements avec transparence et fiabilité.',
  },
  {
    icon: <BarChart4 className="h-6 w-6" />,
    title: 'Suivi en Temps Réel',
    description:
      'Suivez les performances de vos campagnes en direct et ajustez vos stratégies en conséquence.',
  },
  {
    icon: <CircleDollarSign className="h-6 w-6" />,
    title: 'Paiements Sécurisés',
    description:
      'Assurez des transactions sécurisées et ponctuelles avec nos systèmes de paiement intégrés.',
  },
];

export function FeaturesSection() {
  return (
    <Container
      id="features"
      as="section"
      className="flex flex-col-reverse items-center justify-center gap-6 xl:flex-row xl:items-start xl:justify-between"
    >
      <div className="flex w-full flex-1 flex-col gap-8">
        <div className="mx-auto w-full max-w-lg text-center xl:mx-0 xl:text-left">
          <Reveal width="full">
            <Typography as="small" className="font-bold uppercase text-primary">
              Fonctionalités
            </Typography>
          </Reveal>
          <div className="mt-4 flex flex-col gap-3">
            <Reveal width="full">
              <Typography as="h2">
                Pourquoi rejoindre <br /> InfluConnect ?
              </Typography>
            </Reveal>
            <Reveal width="full">
              <Typography variant="description">
                Notre plateforme simplifie et optimise vos campagnes de
                marketing d'influence avec des fonctionnalités innovantes.
                Accédez à des influenceurs vérifiés, suivez vos campagnes en
                temps réel et bénéficiez de paiements sécurisés.
              </Typography>
            </Reveal>
          </div>
        </div>
        <div className="mx-auto flex flex-col gap-8 xl:mx-0">
          {features?.map(feature => (
            <Reveal key={feature.title}>
              <div className="flex items-start gap-6">
                <span className="inline-flex items-center justify-center rounded-md bg-primary p-2 text-white">
                  {feature.icon}
                </span>
                <div className="space-y-3">
                  <Typography as="h3">{feature.title}</Typography>
                  <Typography className="w-full max-w-xl text-muted-foreground">
                    {feature.description}
                  </Typography>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <Reveal>
        <Image
          src="/images/features-img.png"
          fill={false}
          width={1080}
          height={1080}
          className="h-[530px] w-auto object-contain xl:h-[696px]"
          alt="two persons sitting on a table"
        />
      </Reveal>
    </Container>
  );
}
