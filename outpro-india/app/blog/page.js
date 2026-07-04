import Section from "@/components/Section";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <>
      <Section
        eyebrow="Coming soon"
        title="Blog is on the roadmap"
        description="This route is scaffolded and ready — content, data model, and CMS wiring will land in a future release without any architectural changes."
      />
      <div className="hairline pt-16 pb-8">
        <CTASection />
      </div>
    </>
  );
}
