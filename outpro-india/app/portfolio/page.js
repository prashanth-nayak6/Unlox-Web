import Section from "@/components/Section";
import PortfolioGallery from "@/components/PortfolioGallery";
import TestimonialSection from "@/components/TestimonialSection";
import CTASection from "@/components/CTASection";
import { portfolio } from "@/lib/data/portfolio";
import { testimonials } from "@/lib/data/testimonials";

export const metadata = {
  title: "Case Studies",
  description: "Client results from Outpro.India's managed operations teams.",
};

export default function PortfolioPage() {
  return (
    <>
      <Section
        eyebrow="Case studies"
        title="Results, measured the way your board measures them"
        description="A sample of engagements. Full write-ups, references, and video testimonials are available on request."
      >
        <PortfolioGallery items={portfolio} />
      </Section>

      <Section eyebrow="Client testimonials" title="In their own words" className="hairline">
        <TestimonialSection testimonials={testimonials} />
      </Section>

      <div className="hairline pt-16 pb-8">
        <CTASection />
      </div>
    </>
  );
}
