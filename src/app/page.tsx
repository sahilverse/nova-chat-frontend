import { Navigation } from "@/components/home/navigation"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturesSection } from "@/components/home/features-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { StatsSection } from "@/components/home/stats-section"
import { WhyFreeSection } from "@/components/home/why-free-section"
import { CtaSection } from "@/components/home/cta-section"
import { Footer } from "@/components/home/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <WhyFreeSection />
      <CtaSection />
      <Footer />
    </div>
  )
}
