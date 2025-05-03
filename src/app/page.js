"use client";

import Header from "@/components/home/header"
import HeroSection from "@/components/home/hero-section"
import FeaturesSection from "@/components/home/features-section"
import PlatformSection from "@/components/home/platform-section"
import TestimonialsSection from "@/components/home/testimonials-section"
import PricingSection from "@/components/home/pricing-section"
import CtaSection from "@/components/home/cta-section"
import Footer from "@/components/home/footer"


export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <PlatformSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
      <Footer />
    </main>
  )

}
