"use client";

import Header from "@/components/home/header"
import HeroSection from "@/components/home/hero-section"
import FeaturesSection from "@/components/home/features-section"
import PlatformSection from "@/components/home/platform-section"
import TestimonialsSection from "@/components/home/testimonials-section"
import PricingSection from "@/components/home/pricing-section"
import CtaSection from "@/components/home/cta-section"
import Footer from "@/components/home/footer"
import FlickerGrid from "@/components/magicui/flickering-grid"

export default function HomePage() {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <FlickerGrid
          className="h-full w-full"
          showgrid="true"
          flickerChance = "0.8"
          maxOpacity = "0.1"
          color="#275eff"
        />
      </div>
      <main className="min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-0 overflow-x-hidden">
        <Header />
        <HeroSection />
        <FeaturesSection />
        <PlatformSection />
        <TestimonialsSection />
        {/* <PricingSection /> */}
        <CtaSection />
        <Footer />
      </main>
    </>
  )
}
