import Section from "@/components/Section";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "Careers",
};

export default function CareersPage() {
  return (
    <>
      <Section
        eyebrow="Coming soon"
        title="Careers is on the roadmap"
        description="This route is scaffolded and ready — content, data model, and CMS wiring will land in a future release without any architectural changes."
      />
      <div className="hairline pt-16 pb-8">
        <CTASection />
      </div>
    </>
  );
}
