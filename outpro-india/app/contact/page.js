import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Outpro.India to scope a managed operations engagement.",
};

export default function ContactPage() {
  return (
    <Section
      eyebrow="Contact"
      title="Tell us what you want to hand off"
      description="We reply within one business day with a short list of clarifying questions and, usually, a proposed pod structure."
    >
      <div className="grid gap-12 md:grid-cols-[1fr_1fr]">
        <ContactForm />

        <div className="space-y-6 font-mono text-sm">
          <ContactRow icon={Mail} label="Email" value="info_hr@unloxacademy.com" />
          <ContactRow icon={Phone} label="Phone" value="+91 91083 21780" />
          <ContactRow
            icon={MapPin}
            label="Office"
            value="Hustlehub Tech Park, Somasundarapalya Main Rd, 27th Main Road, Sector 2, HSR Layout, Karnataka 560102"
          />
        </div>
      </div>
    </Section>
  );
}

function ContactRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-sm border border-line bg-white p-5">
      <Icon className="mt-0.5 shrink-0 text-signal-dim" size={18} />
      <div>
        <p className="text-[10px] uppercase tracking-wide text-ink-400">{label}</p>
        <p className="mt-1 text-ink-900">{value}</p>
      </div>
    </div>
  );
}
