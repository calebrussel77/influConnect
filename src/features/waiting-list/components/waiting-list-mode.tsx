import { CtaSubscribeSection } from './cta-subscribe-section';
import { FaqSection } from './faq-section';
import { FeaturesSection } from './features-section';
import { HeroSection } from './hero-section';
import { HowItWorksSection } from './how-it-works-section';
import { WaitingListLayout } from './layouts';

export function WaitingListMode() {
  return (
    <WaitingListLayout>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CtaSubscribeSection />
      <FaqSection />
      {/* <TestimonialsSection /> */}
    </WaitingListLayout>
  );
}
