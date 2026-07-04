import { notFound } from "next/navigation";
import * as Icons from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import Section from "@/components/Section";
import CTASection from "@/components/CTASection";
import { services, getServiceBySlug } from "@/lib/data/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.short,
  };
}

export default function ServiceDetailPage({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const Icon = Icons[service.icon] || Icons.Workflow;

  return (
    <>
      <Section>
        <Icon className="mb-6 text-signal-dim" size={32} strokeWidth={1.5} />
        <p className="eyebrow mb-3">Service detail</p>
        <h1 className="max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">{service.name}</h1>
        <p className="mt-4 max-w-xl text-ink-700">{service.description}</p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {service.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-ink-900">
              <CheckCircle2 className="mt-0.5 shrink-0 text-ledger" size={16} />
              {h}
            </li>
          ))}
        </ul>
      </Section>

      <div className="hairline pt-16 pb-8">
        <CTASection
          title={`Talk to us about ${service.name.toLowerCase()}`}
          description="We'll scope a pod size, timeline, and SLA specific to your volume."
        />
      </div>
    </>
  );
}
