import { Container } from '@/components/container';
import { Reveal } from '@/components/ui/reveal';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import { type PropsWithChildren } from 'react';

const Highlighted = ({
  onClick,
  children,
}: PropsWithChildren<{ onClick?: () => void }>) => (
  <span
    onClick={onClick}
    className={cn(
      'font-bold text-primary',
      onClick ? 'cursor-pointer hover:underline' : ''
    )}
  >
    {children}
  </span>
);

const faqs = [
  [
    {
      question: "Qu'est-ce que InfluConnect ?",
      answer: `InfluConnect est une plateforme de marketing d'influence qui connecte les marques avec un réseau diversifié d'influenceurs pour mener des campagnes authentiques et efficaces, avec un suivi en temps réel des performances.`,
    },
    {
      question: "Comment puis-je m'inscrire sur InfluConnect ?",
      answer: `Vous pouvez vous inscrire en cliquant sur 'Rejoindre la liste d'attente'. Remplissez votre email et vous serez informé dès que la plateforme sera accessible.`,
    },
    {
      question:
        "Quel type de marques et d'influenceurs puis-je trouver sur InfluConnect ?",
      answer:
        "InfluConnect collabore avec une large gamme de marques et d'influenceurs de tous les secteurs et niches, garantissant une variété et une pertinence maximales pour toutes les campagnes.",
    },
  ],
  [
    {
      question: `Comment fonctionnent les paiements sur la plateforme ?`,
      answer: (
        <>
          Les paiements sont sécurisés (<Highlighted>Orange money</Highlighted>,{' '}
          <Highlighted>MTN Mobile Money</Highlighted>,{' '}
          <Highlighted>Stripe</Highlighted>) et transmis directement via notre
          système sécurisé après validation de la campagne par la marque. Les
          influenceurs reçoivent leur rémunération de manière ponctuelle et
          transparente.
        </>
      ),
    },
    {
      question: 'Puis-je mesurer le ROI de mes campagnes sur InfluConnect ?',
      answer:
        "Absolument ! Notre plateforme offre des outils de suivi avancés qui vous permettent de mesurer précisément le retour sur investissement de chaque campagne, avec des détails sur le taux d'engagement, la portée et les conversions.",
    },
    {
      question: "InfluConnect est-elle accessible à l'international ?",
      answer:
        "Oui, InfluConnect opère à l'échelle mondiale, permettant aux marques et aux influenceurs de collaborer à travers différentes régions géographiques.",
    },
  ],
  [
    {
      question:
        'Quelles mesures sont prises pour garantir la qualité des influenceurs sur votre plateforme ?',
      answer:
        'Tous les influenceurs sur InfluConnect sont soigneusement vérifiés pour assurer leur authenticité et leur influence réelle. Nous évaluons leur engagement, la qualité de leur contenu, et leur adéquation avec nos standards élevés.',
    },
    {
      question: `Est-il possible de tester la plateforme avant de souscrire à un plan payant ?`,
      answer: `Oui, nous offrons un plan de démarrage gratuit qui vous permet d'explorer les fonctionnalités de base et de gérer une campagne limitée pour tester l'efficacité de notre service avant de vous engager dans un plan plus avancé.`,
    },
    {
      question:
        "Comment puis-je obtenir de l'aide si je rencontre des problèmes sur la plateforme ?",
      answer: (
        <>
          Notre équipe de support client est disponible pour vous aider via{' '}
          <Highlighted
            onClick={() => window.open('mailto:contact@infuconnect.lat')}
          >
            email
          </Highlighted>
          ,{' '}
          <Highlighted
            onClick={() => window.open('https://wa.me/+237655935969')}
          >
            chat en direct
          </Highlighted>
          , ou{' '}
          <Highlighted onClick={() => window.open('tel:+237655935969')}>
            téléphone
          </Highlighted>
          . Nous nous engageons à fournir une assistance rapide et efficace pour
          résoudre tout problème que vous pourriez rencontrer.
        </>
      ),
    },
  ],
];

export function FaqSection() {
  return (
    <Container id="faq" as="section" className="relative">
      <div className="mx-auto w-full max-w-lg text-center xl:mx-0 xl:text-left">
        <Reveal width="full">
          <Typography as="small" className="font-bold uppercase text-primary">
            FAQ
          </Typography>
        </Reveal>
        <div className="mt-4 flex flex-col gap-3">
          <Reveal width="full">
            <Typography as="h2">Questions Fréquemment Posées</Typography>
          </Reveal>
          <Reveal width="full">
            <Typography variant="description">
              Vous avez des questions ? Nous avons des réponses ! Trouvez
              ci-dessous les réponses aux questions les plus courantes sur notre
              plateforme, nos services et notre fonctionnement.
            </Typography>
          </Reveal>
        </div>
      </div>
      <ul
        role="list"
        className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
      >
        {faqs.map((column, columnIndex) => (
          <li key={columnIndex}>
            <ul role="list" className="flex flex-col gap-y-8">
              {column.map((faq, faqIndex) => (
                <Reveal as="li" key={faqIndex} width="full">
                  <Typography
                    as="h3"
                    className="leading-normal md:leading-normal"
                  >
                    {faq.question}
                  </Typography>
                  <Typography variant="small" className="mt-4">
                    {faq.answer}
                  </Typography>
                </Reveal>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Container>
  );
}
