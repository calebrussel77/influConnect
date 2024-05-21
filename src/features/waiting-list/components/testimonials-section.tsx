import React, { type PropsWithChildren } from 'react';
import { Image } from '@/components/ui/image';
import { Container } from '@/components/container';
import { Typography } from '@/components/ui/typography';

interface TestimonialsSectionProps {
  className?: string;
}

const TestimonialsSection =
  ({}: PropsWithChildren<TestimonialsSectionProps>) => {
    return (
      <Container as="section" className="relative isolate overflow-hidden">
        <div className="w-full max-w-lg">
          <Typography as="small" className="font-bold uppercase text-primary">
            Témoignages
          </Typography>
          <div className="mt-4 flex flex-col gap-3">
            <Typography as="h2">Ils nous font déjà confiance</Typography>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="flex flex-col pb-10 sm:pb-16 lg:pb-0 lg:pr-8 xl:pr-20">
              <figure className="mt-10 flex flex-auto flex-col justify-between">
                <blockquote className="text-lg leading-8">
                  <p>
                    “InfluConnect m'a ouvert des portes à des collaborations
                    avec des grandes marques que je n'aurais jamais imaginées.
                    Le processus est transparent et les paiements sont toujours
                    ponctuels. C'est rafraîchissant de travailler avec une
                    plateforme qui valorise vraiment les créateurs de contenu.”
                  </p>
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-x-6">
                  <Image
                    className="h-14 w-14 rounded-full bg-gray-50"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="text-base">
                    <div className="font-semibold">Maxime Leroy</div>
                    <div className="mt-1 text-gray-500">
                      Influenceur Lifestyle
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
            <div className="flex flex-col border-t border-gray-900/10 pt-10 sm:pt-16 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-20">
              <figure className="mt-10 flex flex-auto flex-col justify-between">
                <blockquote className="text-lg leading-8">
                  <p>
                    “Nous utilisons InfluConnect et sommes impressionnés par les
                    analyses détaillées et le suivi des campagnes. Cela nous
                    permet de prendre des décisions éclairées et d'optimiser nos
                    stratégies de marketing d'influence continuellement. La
                    plateforme est intuitive, et la qualité des influenceurs est
                    exceptionnelle. C'est un outil indispensable pour toute
                    marque souhaitant booster sa visibilité en ligne !”
                  </p>
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-x-6">
                  <Image
                    className="h-14 w-14 rounded-full bg-gray-50"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="text-base">
                    <div className="font-semibold">Sophie Bernard</div>
                    <div className="mt-1 text-gray-500">
                      Responsable des Partenariats, TechnoAdvance
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </Container>
    );
  };

export { TestimonialsSection };
