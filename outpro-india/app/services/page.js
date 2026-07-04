import Section from "@/components/Section";
import ServicesGrid from "@/components/ServicesGrid";
import CTASection from "@/components/CTASection";
import { services } from "@/lib/data/services";

export const metadata = {
  title: "Services",
  description: "Business process outsourcing, customer support, finance operations, data services, IT operations, and HR administration.",
};

export default function ServicesPage() {
  return (
    <>
      <Section
        eyebrow="Services"
        title="Every workflow, run to a written SLA"
        description="Each service below can be scoped as a standalone engagement or bundled into a single pod that covers multiple functions."
      >
        <ServicesGrid services={services} />
      </Section>
      <div className="hairline pt-16 pb-8">
        <CTASection />
      </div>
    </>
  );
}
