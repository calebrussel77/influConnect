import { CtaSubscribeSection } from './cta-subscribe-section';
import { FeaturesSection } from './features-section';
import { HeroSection } from './hero-section';
import { HowItWorksSection } from './how-it-works-section';
import { WaitingListLayout } from './layouts';
import { TestimonialsSection } from './testimonials-section';

export function WaitingListMode() {
  return (
    <WaitingListLayout>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CtaSubscribeSection />
      <TestimonialsSection />
    </WaitingListLayout>
  );
}
