import Section from "@/components/Section";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "About Us",
  description: "Outpro.India's story, mission, and leadership team.",
};

const VALUES = [
  { title: "Ownership over oversight", body: "We run workflows as if they were our own P&L, not a ticket queue we clear and forget." },
  { title: "Visible by default", body: "Every engagement ships with a dashboard. If you can't see it, we haven't finished building it." },
  { title: "Slow to promise, fast to deliver", body: "We scope conservatively and then beat the timeline — not the other way around." },
];

const LEADERSHIP = [
  { name: "Rahul Verma", title: "Co-founder & CEO", bio: "15 years running delivery operations for global BPO providers before founding Outpro.India." },
  { name: "Sneha Kapoor", title: "Co-founder & COO", bio: "Built and scaled support and finance-ops teams from 20 to 400+ people at two prior startups." },
  { name: "Arjun Nair", title: "Head of Client Success", bio: "Owns the relationship from scoping call through quarterly business reviews." },
];

export default function AboutPage() {
  return (
    <>
      <Section
        eyebrow="About Outpro.India"
        title="We started Outpro.India because good operations are invisible — and that's the problem"
        description="Most operations work only gets attention when it breaks. We built a company around making it visible, measurable, and boring in the best possible way, so our clients' teams can spend their attention on the work only they can do."
      />

      <Section eyebrow="What we believe" title="Mission, vision & values" className="hairline">
        <div className="grid gap-6 md:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-sm border border-line bg-white p-6">
              <h3 className="font-display font-bold">{v.title}</h3>
              <p className="mt-2 text-sm text-ink-700">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Leadership" title="The people accountable for delivery" className="hairline">
        <div className="grid gap-6 md:grid-cols-3">
          {LEADERSHIP.map((p) => (
            <div key={p.name} className="rounded-sm border border-line bg-white p-6">
              <div className="mb-4 h-32 w-full rounded-sm bg-ink-100" aria-hidden />
              <h3 className="font-display font-bold">{p.name}</h3>
              <p className="eyebrow mt-1">{p.title}</p>
              <p className="mt-3 text-sm text-ink-700">{p.bio}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="hairline pt-16 pb-8">
        <CTASection
          title="Want the full team story?"
          description="We're happy to walk your team through how a pod is staffed and managed, end to end."
        />
      </div>
    </>
  );
}
