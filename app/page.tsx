export const dynamic = 'force-dynamic'

import { SiteHeader } from "@/components/landing/site-header"
import { HeroSection } from "@/components/landing/hero-section"
import { PackagesSection } from "@/components/landing/packages-section"
import { CarModelsSection } from "@/components/landing/car-models-section"
import { GallerySection } from "@/components/landing/gallery-section"
import { MaterialsSection } from "@/components/landing/materials-section"
import { ProcessSection } from "@/components/landing/process-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { ReviewsSection } from "@/components/landing/reviews-section"
import { WarrantySection } from "@/components/landing/warranty-section"
import { FAQSection } from "@/components/landing/faq-section"
import { FinalCTASection } from "@/components/landing/final-cta-section"
import { Footer } from "@/components/landing/footer"
import { StickyWhatsApp } from "@/components/landing/sticky-whatsapp"

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-16">
        <HeroSection />
        <PackagesSection />
        <CarModelsSection />
        <GallerySection />
        <MaterialsSection />
        <ProcessSection />
        <PricingSection />
        <ReviewsSection />
        <WarrantySection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
      <StickyWhatsApp />
    </>
  )
}
