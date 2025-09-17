import {
  LandingNavigation,
  HeroSection,
  FeaturesSection,
  StatsSection,
  TestimonialsSection,
  CTASection,
  Footer
} from '@/components/features/landing'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <LandingNavigation />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  )
}
