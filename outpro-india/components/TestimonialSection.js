import { Quote } from "lucide-react";

export default function TestimonialSection({ testimonials }) {
  return (
    <div id="testimonials" className="grid gap-6 md:grid-cols-3">
      {testimonials.map((t) => (
        <figure key={t.name} className="flex flex-col justify-between rounded-sm bg-ink-900 p-7 text-ink-50">
          <div>
            <Quote className="mb-4 text-signal" size={22} strokeWidth={1.5} />
            <blockquote className="text-sm leading-relaxed text-ink-50/90">
              {t.quote}
            </blockquote>
          </div>
          <figcaption className="mt-6 border-t border-white/10 pt-4">
            <p className="text-sm font-medium">{t.name}</p>
            <p className="font-mono text-[11px] text-ink-50/50">{t.title}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
