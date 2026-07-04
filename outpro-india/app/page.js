import Hero from "@/components/Hero";
import MetricsStrip from "@/components/MetricsStrip";
import Section from "@/components/Section";
import ServicesGrid from "@/components/ServicesGrid";
import PortfolioGallery from "@/components/PortfolioGallery";
import TestimonialSection from "@/components/TestimonialSection";
import CTASection from "@/components/CTASection";
import { services } from "@/lib/data/services";
import { portfolio } from "@/lib/data/portfolio";
import { testimonials } from "@/lib/data/testimonials";

export const metadata = {
  title: "Outpro.India | Operational Excellence, Delivered",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <MetricsStrip />

      <Section
        eyebrow="What we run"
        title="Six operating functions, one accountable partner"
        description="Pick the workflows you want off your plate. We staff, train, and manage them against the SLA you set."
      >
        <ServicesGrid services={services} compact />
        <div className="mt-8">
          <a href="/services" className="btn-secondary">View all services</a>
        </div>
      </Section>

      <Section
        eyebrow="Proof, not promises"
        title="Recent client outcomes"
        className="hairline"
      >
        <PortfolioGallery items={portfolio} />
      </Section>

      <Section eyebrow="From the people we work with" title="What clients say" className="hairline">
        <TestimonialSection testimonials={testimonials} />
      </Section>

      <div className="hairline pt-16 pb-8">
        <CTASection />
      </div>
    </>
  );
}
